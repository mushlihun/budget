import { Injectable } from '@angular/core';
//


@Injectable()
export class OrdersService {
    private allOrders = []
    private produk = []

    
    constructor() {
        
    }
    newOrder = (order) => {
        this.allOrders.push(order);
    }

    produks = () => {
        return this.produk;
    }

    addProduct(product) {
        this.produk.push(product);
    }

    getOrders = () => {
        return this.allOrders;
    }
}
    
