import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  visibleSidebar1: any;
  display: boolean = false;
  countProd!: number;
  countFav!: number;
  cart: Product[] = [];

  ngOnInit() {
    this.countProd = 0;
    const cart = JSON.parse(localStorage.getItem('prod') as any);
    this.countProd = cart.length;

    if (this.getProdStored() !== null) {
    } else {
      console.log('cart is empty!');
    }

    this.countFav = 0;
    const fav = JSON.parse(localStorage.getItem('prod') as any);
    this.countFav = fav.length;

    if (this.getFavStored() !== null) {
    } else {
      console.log(`favorite's list is empty!`);
    }
  }

  showDialog() {
    this.display = true;
  }

  getProdStored() {
    let p = localStorage.getItem('prod');
    return p;
  }

  getFavStored() {
    let f = localStorage.getItem('prod');
    return f;
  }
}
