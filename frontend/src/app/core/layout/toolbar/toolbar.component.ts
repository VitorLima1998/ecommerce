import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  display: boolean = false;
  countProd!: number;

  cart: Product[] = [];

  ngOnInit() {
    const cart = JSON.parse(localStorage.getItem('prod') as any);
    this.countProd = cart.length;

    if (this.getProdStored() !== null) {
      console.log(this.getProdStored());
    } else {
      console.log('cart is empty!');
    }
  }

  showDialog() {
    this.display = true;
  }

  getProdStored() {
    let p = localStorage.getItem('prod');
    return p;
  }
}
