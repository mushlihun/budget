export class Categories {
    name: string;
    img: string;
    open: boolean;
    products: Product[];
}

export class MenuGlobal {
    categories: Categories[];
}

export class Order {
    date: Date;
    datatotal: Produks[];
    // products: Product[];
    // produk: produk[];
}

export class Produks {
    kode_bahan: string;
    nama_bahan: string;
    quantity: number;
    satuan: string;
}

export class Product {
    img: string;
    desc: string;
    name: string;
    price: number;
    quantity: number;
}
