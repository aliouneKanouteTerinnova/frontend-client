import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModelPublic, CartModelServer } from '../../models/cart/cart';
import { Products } from '../../models/products/products';
import { ProductsService } from '../products/products.service';
import { CookieService } from 'ngx-cookie-service';
import { Item } from 'src/app/models/item/item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartDataClient: CartModelPublic = { prodData: [{ incart: 0, id: 0 }], total: 0 };
  // This will be sent to the backend Server as post data
  // Cart Data variable to store the cart information on the server
  private cartDataServer: CartModelServer = {
    data: [
      {
        product: undefined,
        numInCart: 0,
      },
    ],
    total: 0,
  };
  info: CartModelPublic;

  cartTotal$ = new BehaviorSubject<Number>(0);
  productTotal$ = new BehaviorSubject<Number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);
  currentUser: any;
  orderProducts = [];

  constructor(
    private productService: ProductsService,
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    if (this.cookieService.get('currentUser')) {
      this.currentUser = JSON.parse(this.cookieService.get('currentUser'));

      this.getCart(this.currentUser['user'].token).subscribe(
        (data) => {
          if (data.body && data.body.status === 'Open') {
            this.orderProducts = data.body.items;
            if (this.orderProducts.length > 0) {
              this.orderProducts.forEach((element) => {
                // console.log(element.product, element.quantity);
                if (element.quantity === 1) {
                  this.addProductToBasket(element.product.id);
                } else {
                  for (let index = 0; index < element.quantity; index++) {
                    this.addProductToBasket(element.product.id);
                  }
                }
              });
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.currentUser = null;

      if (cookieService.check('cart')) {
        this.info = JSON.parse(this.cookieService.get('cart'));
        this.cartTotal$.next(this.cartDataServer.total);
        this.cartDataObs$.next(this.cartDataServer);
        let total = 0;
        this.cartDataServer.data.forEach((element) => {
          total += element.numInCart;
        });
        this.productTotal$.next(total);
      }

      if (this.info !== null && this.info !== undefined && this.info.prodData[0].incart !== 0) {
        // assign the value to our data variable which corresponds to the this.cookieService data format
        this.cartDataClient = this.info;
        // Loop through each entry and put it in the cartDataServer object
        this.cartDataClient.prodData.forEach((p) => {
          this.productService.getCurrentData(p.id).subscribe((actualProdInfo: Products) => {
            if (this.cartDataServer.data[0].numInCart === 0) {
              this.cartDataServer.data[0].numInCart = p.incart;
              this.cartDataServer.data[0].product = actualProdInfo;
              this.CalculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
            } else {
              this.cartDataServer.data.push({
                numInCart: p.incart,
                product: actualProdInfo,
              });
              this.CalculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
            }
            this.cartDataObs$.next(this.cartDataServer);
          });
        });
      }
    }
  }
  deleteCart() {
    this.cookieService.delete('cart');
    this.cartDataServer = {
      data: [
        {
          product: undefined,
          numInCart: 0,
        },
      ],
      total: 0,
    };
    this.cartDataObs$.next(this.cartDataServer);
    this.cartTotal$.next(this.cartDataServer.total);
    let total = 0;
    this.cartDataServer.data.forEach((element) => {
      total += element.numInCart;
    });
    this.productTotal$.next(total);
  }

  CalculateSubTotal(index): Number {
    let subTotal = 0;

    let p = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = p.product.price * p.numInCart;

    return subTotal;
  }

  AddProductToCart(id: Number, quantity?: number) {
    if (this.cookieService.get('currentUser')) {
      this.currentUser = JSON.parse(this.cookieService.get('currentUser'));
    } else {
      this.currentUser = null;
    }
    if (this.currentUser) {
      const item: Item = {
        product: id,
        quantity: quantity > 1 ? quantity : 1,
      };
      this.addItemToCart(item, this.currentUser['user'].token).subscribe(
        (dataItem) => {
          console.log(dataItem);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.addProductToBasket(id, quantity);
  }

  addProductToBasket(id: Number, quantity?: number) {
    this.productService.getCurrentData(id).subscribe((prod) => {
      // If the cart is empty
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        this.CalculateTotal();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next(this.cartDataServer);
      } // END of IF
      // Cart is not empty
      else {
        let index = this.cartDataServer.data.findIndex((p) => p.product.id === prod.id);

        // 1. If chosen product is already in cart array
        if (index !== -1) {
          if (quantity !== undefined && quantity <= prod.quantity) {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart =
              this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
          } else {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart < prod.quantity
              ? this.cartDataServer.data[index].numInCart++
              : prod.quantity;
          }

          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          // this.toast.info(`${prod.name} quantity updated in the cart.`, "Product Updated", {
          //   timeOut: 1500,
          //   progressBar: true,
          //   progressAnimation: 'increasing',
          //   positionClass: 'toast-top-right'
          // })
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: 1,
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.id,
          });
          // this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
          //   timeOut: 1500,
          //   progressBar: true,
          //   progressAnimation: 'increasing',
          //   positionClass: 'toast-top-right'
          // })
        }
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next(this.cartDataServer);
      } // END of ELSE
    });
  }

  UpdateCartData(index, increase: Boolean) {
    if (this.cookieService.get('currentUser')) {
      this.currentUser = JSON.parse(this.cookieService.get('currentUser'));
    } else {
      this.currentUser = null;
    }
    let data = this.cartDataServer.data[index];
    if (increase) {
      if (this.currentUser) {
        const item: Item = {
          product: data.product.id,
          quantity: 1,
        };
        this.addItemToCart(item, this.currentUser['user'].token).subscribe(
          (dataItem) => {
            console.log(dataItem);
          },
          (error) => {
            console.log(error);
          }
        );
      }
      // @ts-ignore
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next(this.cartDataServer);
      this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
    } else {
      if (this.currentUser) {
        const idProd = this.cartDataServer.data[index].product.id;
        this.getCart(this.currentUser['user'].token).subscribe(
          (data) => {
            const product = data.body.items.filter((item) => {
              return item.product.id === idProd;
            });
            if (product.length > 0) {
              // product.forEach((element) => {
              this.deleteItemToCart(product[0].id, this.currentUser['user'].token).subscribe(
                (datas) => {
                  console.log(datas);
                },
                (error) => {
                  console.log(error);
                }
              );
              // });
            }
            // }
          },
          (error) => {
            console.log(error);
          }
        );
      }
      // @ts-ignore
      data.numInCart--;

      // @ts-ignore
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next(this.cartDataServer);
      } else {
        // @ts-ignore
        this.cartDataObs$.next(this.cartDataServer);
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  DeleteProductFromCart(index) {
    if (this.cookieService.get('currentUser')) {
      this.currentUser = JSON.parse(this.cookieService.get('currentUser'));
    } else {
      this.currentUser = null;
    }
    const idProd = this.cartDataServer.data[index].product.id;
    console.log(this.currentUser);
    if (this.currentUser) {
      this.getCart(this.currentUser['user'].token).subscribe(
        (data) => {
          const product = data.body.items.filter((item) => {
            return item.product.id === idProd;
          });
          if (product.length > 0) {
            product.forEach((element) => {
              this.deleteItemToCart(element.id, this.currentUser['user'].token).subscribe(
                (datas) => {
                  console.log(datas);
                },
                (error) => {
                  console.log(error);
                }
              );
            });
          }
          // }
        },
        (error) => {
          console.log(error);
        }
      );
    }

    // if (window.confirm('Are you sure you want to delete the item?')) {
    this.cartDataServer.data.splice(index, 1);
    this.cartDataClient.prodData.splice(index, 1);
    this.CalculateTotal();
    this.cartDataClient.total = this.cartDataServer.total;

    if (this.cartDataClient.total === 0) {
      this.cartDataClient = { prodData: [{ incart: 0, id: 0 }], total: 0 };
      this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
    } else {
      this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
    }

    if (this.cartDataServer.total === 0) {
      this.cartDataServer = {
        data: [
          {
            product: undefined,
            numInCart: 0,
          },
        ],
        total: 0,
      };
      this.cartDataObs$.next(this.cartDataServer);
    } else {
      this.cartDataObs$.next(this.cartDataServer);
    }
    // }
    // If the user doesn't want to delete the product, hits the CANCEL button
    // else {
    //   return;
    // }
  }

  private CalculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach((p) => {
      const { numInCart } = p;
      const { price } = p.product;
      // @ts-ignore
      Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
    let total = 0;
    this.cartDataServer.data.forEach((element) => {
      total += element.numInCart;
    });
    this.productTotal$.next(total);
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [
        {
          product: undefined,
          numInCart: 0,
        },
      ],
      total: 0,
    };
    this.cartDataObs$.next(this.cartDataServer);
  }

  //Initiate Cart
  InitiateBasket(token: any) {
    token = 'token ' + token;
    return this.httpClient.post<any>(
      `${environment.baseUrl}carts`,
      {},
      {
        headers: new HttpHeaders().set('Authorization', token),
        observe: 'response',
      }
    );
  }

  //Add item to Cart
  addItemToCart(data: any, token: any) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.baseUrl}carts/items`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  // Delete item from Cart
  deleteItemToCart(id: any, token: any) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}carts/items/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  // get customer Cart
  getCart(token: any) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}carts`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
