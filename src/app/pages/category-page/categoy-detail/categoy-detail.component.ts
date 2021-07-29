import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categoy-detail',
  templateUrl: './categoy-detail.component.html',
  styleUrls: ['./categoy-detail.component.scss'],
})
export class CategoyDetailComponent implements OnInit {
  products = [];
  categoyId: string;
  constructor(private router: ActivatedRoute, private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoyId = this.router.snapshot.params.id;

    this.categoryService.getCategory(this.categoyId).subscribe((res) => {
      this.products = res.products;
      console.log(res.products);
    });
  }
}
