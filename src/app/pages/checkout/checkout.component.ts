/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
import { PaymentsService } from './../../services/payments.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address/address';
import { AuthResponded } from 'src/app/models/auth/auth';
import { CartModelServer } from 'src/app/models/cart/cart';
import { Item } from 'src/app/models/item/item';
import { ShippingAddress } from 'src/app/models/shipping-address/shipping-address';
import { ShippingMethod } from 'src/app/models/shipping-method/shipping-method';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';
import { Stripe } from 'stripe-angular';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { CartItem } from 'src/app/dtos/cart-item/cart-item';
import { CartModel } from 'src/app/models/cart/cart-model';
import { CartItemModel } from 'src/app/models/cart/cart-item-model';
import { ShippingAdressService } from 'src/app/services/shipping-adress/shipping-adress.service';
import { Observable } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/models/order/order';
import { OrderDto } from 'src/app/dtos/orders/order-dto';
import { OrderItem } from 'src/app/dtos/orders/order-item';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { BankAccount } from 'src/app/models/payment/bank-account';
import { CreditCard } from 'src/app/models/payment/credit-card';
import { OrderItemsService } from 'src/app/services/orders/order-items.service';
// import { ShippingMethod } from 'src/app/dtos/order/shipping-method';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  ShippingAdressForm: FormGroup;
  testForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  currentUser: any;
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  idCart: any;
  stripe: any;
  totalTax: number = 20;
  shippingTax: Number = 20;
  card;
  token;
  pbKey;
  orderNumber;
  items: CartItem[] = [];
  cart: CartModel;
  errorMessage: any;
  title = 'Billing';
  panelOpenState = false;
  ShippingAdress: ShippingAddress;
  shippingAdresses: ShippingAddress[];
  bankAccounts: BankAccount[];
  creditCards: CreditCard[];
  selected: string;
  setShipAdressForm: FormGroup;
  shipAdress: any;
  orderItem: OrderItem[];
  shippingAdressesForActicles = [];
  orderId: any;

  constructor(
    public cartService: CartService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationsService,
    private orderService: OrdersService,
    private router: Router,
    private payment: PaymentService,
    private i18nServiceService: I18nServiceService,
    private shippingAdressService: ShippingAdressService,
    private orderItemService: OrderItemsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.token = this.currentUser.token || this.currentUser['user'].token;
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
      console.dir(this.cartData);
    });

    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });

    this.initForm('', '');

    this.ShippingAdressForm = this.formBuilder.group({
      fullname: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: [null, Validators.required],
      zipcode: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
      street: [null, Validators.required],
      use_default: [false],
    });

    // if (this.currentUser) {
    //   this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).subscribe((data) => {
    //     const user: AuthResponded = data.body;
    //     this.ShippingAdressForm.patchValue({
    //       fullname: user['user'].fullname,
    //       email: user['user'].email,
    //       state: user['user'].address.state,
    //       zip: user['user'].address.zipcode,
    //       country: user['user'].address.country,
    //       address: user['user'].address.street,
    //       city: user['user'].address.state,
    //     });
    //   });
    // }

    this.setShipAdressForm = this.formBuilder.group({
      ship_adress: ['', Validators.required],
    });

    this.allShippingAdress();

    this.getCreditCards();
    this.getBankAccount();
    this.updateCartOnServer();
    // this.selected = this.shippingAdresses[-1].name + ', ' + this.shippingAdresses[-1].city;
  }

  getCartDto() {
    let items: CartItem[] = [];
    this.cartData.data.forEach((element) => {
      const item: CartItem = {
        product: element.product.id.toString(),
        quantity: element.numInCart,
      };
      items.push(item);
    });

    return items;
  }

  updateCart(data) {
    let cart = new CartModel();
    cart.id = data.id;
    cart.items = [];

    data.items.forEach((element) => {
      let item = new CartItemModel();
      item.id = element.id;
      item.product = element.product;
      item.quantity = element.quantity;
      cart.items.push(item);
    });

    return cart;
  }

  updateCartOnServer() {
    this.items = this.getCartDto();

    console.dir(this.items, 'Update cart on server');
    this.cartService.get(this.token).subscribe((res) => {
      this.cart = this.updateCart(res.body);
      this.cartService.update(this.token, this.items, this.cart.id).subscribe(
        (response) => {
          this.cart = response.body;
          console.dir(this.items, 'Update cart on server');
          //console.dir("Cart :");
          console.dir(this.cart, 'cart');
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  initForm(amount, orderNumber) {
    this.testForm = this.formBuilder.group({
      amount: ['Amount : ' + amount, Validators.required],
      orderNumber: ['Order number : ' + orderNumber, Validators.required],
    });
  }

  initStripeForm() {
    const elements = this.stripe.elements();
    // eslint-disable-next-line no-var
    const style = {
      style: {
        base: {
          fontFamily: 'Raleway, sans-serif',
          fontSize: '16px',
          color: '#C1C7CD',
        },
        invalid: { color: 'red' },
      },
    };

    this.card = elements.create('card', style);

    this.card.mount('#card-element');

    this.card.addEventListener('change', (event) => {
      if (event.error) {
        this.errorMessage = event.error.message;
      } else {
        this.errorMessage = '';
      }
    });
  }

  allShippingAdress() {
    this.shippingAdressService.all(this.token).subscribe(
      (res) => {
        this.shippingAdresses = res.body;
      },
      (err) => {
        console.table(err);
      }
    );
  }

  getShippingAdress(id: string) {
    this.shippingAdressService.get(this.token, id).subscribe(
      (res) => {
        return res.body.result;
      },
      (err) => {
        console.table(err);
      }
    );
  }

  deleteShippingAdress(shippingAdress: ShippingAddress) {
    this.shippingAdressService.delete(this.token, shippingAdress.id).subscribe(
      (res) => {
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Adress deleted!',
          showConfirmButton: false,
          timer: 2000,
        }),
          (this.shippingAdresses = this.shippingAdresses.filter((t) => t.id !== shippingAdress.id));
      },
      (err) => {
        console.table(err);
      }
    );
  }

  formatPrice(price: any) {
    let prices = price.split('.');
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      prices = price;
    } else {
      prices = prices[0] + ',' + prices[1];
      if (prices.split(',').length > 2) {
        prices = prices.split(',')[0] + '' + prices.split(',')[1] + ',' + prices.split(',')[2];
      }
    }
    return prices;
  }

  createOrder() {
    this.cartService.get(this.token).subscribe((data) => {
      this.idCart = data.body.id;
      const cartItems = data.body.items;

      //Reset Cart
      cartItems.map((elm) => {
        this.cartService.removeItem(this.token, elm.id).subscribe(
          (res) => {
            console.dir(res, 'Item deleted !');
          },
          (err) => {
            console.dir(err);
          }
        );
      });

      this.cartData.data.map((element) => {
        const orderItem: Item = {
          product: element.product.id,
          quantity: element.numInCart,
        };

        this.cartService.addItemToCart(orderItem, this.token).subscribe(
          (dataItem) => {
            console.dir(dataItem);
          },
          (error) => {
            console.dir(error);
          }
        );
      });

      const order: OrderDto = {
        cart: this.idCart,
        total_tax: this.totalTax,
      };

      this.orderService.initiate(this.token, order).subscribe(
        (data) => {
          this.orderItem = data.body.order_items;
          this.orderId = data.body.id;
        },
        (err) => {
          console.dir(err);
        }
      );
    });
  }

  // updateCart() {

  //   const Items: CartItem = {
  //     product: this.cartData.data,
  //     quantity: this.cartData.total,
  //   }

  //   this.cartService.update(this.token, Items, this.idCart).subscribe();

  // }

  addShippingAdress() {
    this.createOrder();

    const name = this.ShippingAdressForm.get('fullname').value;
    const state = this.ShippingAdressForm.get('state').value;
    const street = this.ShippingAdressForm.get('street').value;
    const city = this.ShippingAdressForm.get('city').value;
    const zipcode = this.ShippingAdressForm.get('zipcode').value;
    const country = this.ShippingAdressForm.get('country').value;
    const phone = this.ShippingAdressForm.get('phone').value;
    const email = this.ShippingAdressForm.get('email').value;

    const shippingAdress: ShippingAddress = {
      name: name,
      state: state,
      street1: street,
      city: city,
      zip_code: zipcode,
      country: country,
      phone: phone,
      email: email,
    };

    this.shippingAdressService.create(this.token, shippingAdress).subscribe(
      (res) => {
        this.shippingAdresses.push(res.body);
        this.ShippingAdress = shippingAdress;
        console.table(this.cartData);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Adress added sucessfully !',
          showConfirmButton: false,
          timer: 2000,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateCartItems(event) {
    const result = event.target.value;

    var temp = result.split(','),
      resultObject = {};

    for (let i = 0; i < temp.length; i += 2) {
      resultObject[temp[i]] = temp[i + 1];
    }

    this.shippingAdressesForActicles.push(resultObject);
    console.dir(this.shippingAdressesForActicles);

    console.dir(this.orderItem);

    this.shippingAdressesForActicles.forEach((ship) => {
      this.orderItem.forEach((item) => {
        if (ship.product == item.cart_item.product.id) {
          item.shipping_address = ship.ship_adress;
          console.dir(item.shipping_address, 'Ship adress set!');
        }
      });
    });
  }

  setOrderItems() {
    this.orderItem.forEach((item) => {
      this.orderItemService.update(this.token, item.id, item).subscribe(
        (res) => {
          console.dir(res, 'set order items success !');
        },
        (err) => {
          console.dir(err, 'set order items error !');
        }
      );
    });
  }

  createShipment() {
    this.setOrderItems();

    this.orderItem.forEach((orderI) => {
      this.orderItemService.createShipment(this.token, orderI.id).subscribe(
        (res) => {
          console.dir(res, 'create shipment success !');
        },
        (err) => {
          console.dir(err, 'create shipment error !');
        }
      );
    });
  }

  choosePaymentMethod(form) {}

  addBankAcc(form) {
    const bic = form.value.bic;
    const iban = form.value.iban;
    const account_name = form.value.account_name;

    const bankAccount: BankAccount = {
      bic: bic,
      iban: iban,
      account_name: account_name,
    };

    this.payment.addBankAccount(this.token, bankAccount).subscribe(
      (res) => {
        console.table(res);
      },
      (err) => {
        console.table(err);
      }
    );
  }

  getBankAccount() {
    this.payment.getBankAccount(this.token).subscribe(
      (res) => (this.bankAccounts = res.body),
      (err) => console.dir(err)
    );
  }

  addCreditCard(form) {
    const card = new CreditCard();
    card.card_name = form.value.name_on_card;
    card.card_number = form.value.card_number;
    card.cvc = form.value.cvc;
    card.expiration_date = form.value.expireYY + '-' + form.value.expireMM + '-01';

    this.payment.addCreditCard(this.token, card).subscribe(
      (res) => {
        console.table(res);
      },
      (err) => {
        console.table(err);
      }
    );
  }

  getCreditCards() {
    this.payment.getCreditCard(this.token).subscribe(
      (res) => (this.creditCards = res.body),
      (err) => console.dir(err)
    );
  }

  // checkout() {

  // if (this.shippingAdresses == undefined) {
  //   return;
  // }

  // this.cartService.get(this.currentUser.token || this.currentUser['user'].token).subscribe(
  //   (data) => {
  //     this.idCart = data.body.id;

  //     this.cartData.data.forEach((element) => {
  //       const item: Item = {
  //         product: element.product.id,
  //         quantity: element.numInCart,
  //       };
  //       this.cartService.addItemToCart(item, this.currentUser.token).subscribe(
  //         (dataItem) => {},
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //     });

  // const addresse: Address = {
  //   country: state,
  //   state: city,
  //   street: address,
  //   zip_code: zip_code,
  // };

  // const shippingMethod: ShippingMethod = {
  //   name: 'DHL',
  //   price: 10000,
  //   currency: 'EUR',
  // };

  // const order = {
  //   cart: this.idCart,
  //   // currency: 'EUR',
  //   total_tax: this.totalTax,
  //   // shipping_tax: this.shippingTax,
  //   // total_prices: this.cartTotal,
  //   // shipping_address: this.ShippingAdress,
  //   // shipping_method: shippingMethod,
  // };

  // this.orderService.initiate(order, this.currentUser.token || this.currentUser['user'].token).subscribe(
  //   (data) => {
  //     console.log('oder created ', data);
  //     // const sommes = +order.total_prices + +order.total_tax + +order.shipping_method.price;
  //     const param = {
  //       order_number: data.body.number,
  //       method: 'card',
  //       // amount: Math.round(sommes),
  //       currency: 'EUR',
  //     };
  //           this.payment.payment(param, this.currentUser.token || this.currentUser['user'].token).subscribe(
  //             (res) => {
  //               this.pbKey = res.body.public_key;
  //               this.token = res.body.token;
  //               this.orderNumber = res.body.payment.order_number;
  //               // const method = res.body.payment.method;
  //               // const amount = res.body.payment.amount;
  //               this.stripe = Stripe(this.pbKey);

  //               this.initStripeForm();

  //               // this.initForm(sommes, this.orderNumber);
  //               console.log(res);
  //             },
  //             (err) => {
  //               console.log(err);
  //             }
  //           );
  //           this.cartService.deleteCart();
  //           Swal.fire({
  //             position: 'top-end',
  //             icon: 'success',
  //             title: `Order has been successfully registrered, check your my to see confirmation`,
  //             showConfirmButton: false,
  //             timer: 5000,
  //           });
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //     },
  //     (errors) => {
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'error',
  //         title: `${errors.error.error}`,
  //         showConfirmButton: true,
  //         timer: 5000,
  //       });
  //       console.log(errors);
  //     }
  //   );
  // }

  // OnSubmit() {
  // this.stripe
  //   .confirmCardPayment(`${this.token}`, {
  //     payment_method: {
  //       card: this.card,
  //     },
  //   })
  //   .then((result) => {
  //     console.log(result);
  //     if (result.error) {
  //       this.errorMessage = result.error.message;
  //     } else if (result.paymentIntent.status === 'succeeded') {
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'payment has been made',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       const body = {
  //         order_number: this.orderNumber,
  //       };
  //       this.payment
  //         .confirmCardPayment(this.currentUser.token || this.currentUser['user'].token, result.paymentIntent.id, body)
  //         .subscribe((res) => {
  //           this.router.navigate(['/orders']);
  //           console.log(res);
  //         });
  //     }
  //   });
  // }

  // orderPlaced() {
  // //validate before submission
  // var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
  // if (form.checkValidity() === false) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   form.classList.add('was-validated');
  // }
  // else {
  //   alert('Order placed Successfully ! ');
  //   this.getItemsFromCart();
  //   let leftCartItems = this.totalCartItems;
  //   for (let i = leftCartItems - 1; i >= 0; i--) {
  //     this.cartService.removeCart(i);
  //   }
  //   this.router.navigateByUrl('/home');
  // }
  // }

  // getItemsFromCart = () => {
  //   // this.cartService.cartListSubject
  //   //   .subscribe(res => {
  //   //     this.cartList = res;
  //   //     let totalItems = 0;
  //   //     for (let cart of this.cartList) {
  //   //       totalItems += 1;
  //   //     }
  //   //     this.totalCartItems = totalItems;
  //   //   })
  // };

  // shipping() {}

  // ChangeQuantity(id: Number, increaseQuantity: Boolean) {
  //   this.cartService.UpdateCartData(id, increaseQuantity);
  // }

  changeQuantity(e, c, index) {
    const quantity = Number(e.target.value);
    const temp = c.numInCart;
    if (quantity > c.product.quantity) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${c.product.quantity} articles of ${c.product.name} left`,
      });
      c.numInCart = c.product.quantity;
    } else if (quantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cannot have 0 article',
      });
      c.numInCart = 1;
    } else {
      c.numInCart = quantity - 1;
      // this.ChangeQuantity(index, true);
    }

    console.dirxml(quantity, c);
    // }
  }
}
