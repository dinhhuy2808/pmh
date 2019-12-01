import { Component, OnInit } from '@angular/core';
import { Settingshop } from '../shared/models/settingshop';
import { TreefolderService } from '../shared/services/treefolder.service'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
  providers: [TreefolderService]
})
export class MaintenanceComponent implements OnInit {
   settingShop : Settingshop = new Settingshop();
   treeMap: Map<string, string[]> = new Map<string, string[]>();
   treeName: string = '';
   catName: string = '';
    phuongthucvanchuyen: string = '';
    phuongthucthanhtoan: string = '';
    vanchuyenChecked : boolean[] = [false,false,false,false];//ghtk,bd,vtp,ghn
    thanhtoanChecked : boolean[] = [false,false,false,false];//tm,COD,ck,ttd
  constructor( private treefolderService : TreefolderService, private cookieService: CookieService ) { }

  ngOnInit() {
      this.treefolderService.getTreefolder().subscribe(( data: {} ) => {
          for ( const [key, value] of Object.entries( data ) ) {
              this.treeMap.set( key, data[key] );
          }
          this.treefolderService.getSettingShop().subscribe(( setting: Settingshop) => {
              this.settingShop = setting;
              this.phuongthucthanhtoan = this.settingShop.paymentMethod;
              this.phuongthucvanchuyen = this.settingShop.transportMethod;
              if(this.settingShop.transportMethod.match('ghtk;')){
                  this.vanchuyenChecked[0] = true;
              }
              if(this.settingShop.transportMethod.match('bd;')){
                  this.vanchuyenChecked[1] = true;
              }
              if(this.settingShop.transportMethod.match('vtp;')){
                  this.vanchuyenChecked[2] = true;
              }
              if(this.settingShop.transportMethod.match('ghn;')){
                  this.vanchuyenChecked[3] = true;
              }
              
              if(this.settingShop.paymentMethod.match('tm;')){
                  this.thanhtoanChecked[0] = true;
              }
              if(this.settingShop.paymentMethod.match('COD;')){
                  this.thanhtoanChecked[1] = true;
              }
              if(this.settingShop.paymentMethod.match('ck;')){
                  this.thanhtoanChecked[2] = true;
              }
              if(this.settingShop.paymentMethod.match('ttd;')){
                  this.thanhtoanChecked[3] = true;
              }
          } );
      } );
  }
  
  addTreeFolder():void{
      this.treefolderService.addTreeFolder(this.treeName, this.catName, this.cookieService.get('token')).subscribe(( res ) => {
          if(res == '200'){
              this.treefolderService.getTreefolder().subscribe(( data: {} ) => {
                  for ( const [key, value] of Object.entries( data ) ) {
                      this.treeMap.set( key, data[key] );
                  }
                  this.treeName = '';
                  this.catName = '';
              } );
          }
      } );
  }
  
  vanchuyenChange( value ) {
      if ( value.checked ) {
          this.phuongthucvanchuyen = this.phuongthucvanchuyen + value.value + ';';
      } else {
          this.phuongthucvanchuyen = this.phuongthucvanchuyen.replace( value.value + ';', '' );
      }
  }
  
  thanhtoanChange( value ) {
      if ( value.checked ) {
          this.phuongthucthanhtoan = this.phuongthucthanhtoan + value.value + ';';
      } else {
          this.phuongthucthanhtoan = this.phuongthucthanhtoan.replace( value.value + ';', '' );
      }
  }
  
  updateSettingShop() :void {
      this.settingShop.paymentMethod = this.phuongthucthanhtoan;
      this.settingShop.transportMethod = this.phuongthucvanchuyen;
      this.treefolderService.updateSettingShop(this.settingShop, this.cookieService.get('token')).subscribe(( res ) => {
          if(res == '200'){
             window.location.reload();
          }
      } );
  }

}
