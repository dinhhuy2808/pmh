import { Cart } from '../models/cart';
import { Settingshop } from '../models/settingshop';
export class PaymentScreen {
    payment_id: number = 0;
    userId: number = 0;
    status: string = '';
    voucher: string = '';
    note: string = '';
    ship: string = '';
    type: string = '';
    name: string = '';
    phone: string = '';
    address: string = '';
    carts: Cart[];
    settingShop: Settingshop = new Settingshop();
    title: string = '';
    shipfee: number = 0;
    total: number = 0;
    tinhthanh: string = '';
    quanhuyen: string = '';
    hinhthuc: string = '';
}