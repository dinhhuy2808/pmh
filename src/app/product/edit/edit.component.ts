import { Component, OnInit } from '@angular/core';
import { Size } from '../../shared/models/size'
import { Product } from '../../shared/models/product'
import { Thuoctinh } from '../../shared/models/thuoctinh'
import { ProductService } from '../../shared/services/product.service'
import { FileSaver } from 'file-saver';
import { DynamicScriptLoaderService } from '../../shared/services/DynamicScriptLoaderService.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProducScreenDtail } from '../../shared/screenvars/ProducScreenDetail'
import { CookieService } from 'ngx-cookie-service';

@Component( {
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    providers: [ProductService, DynamicScriptLoaderService]
} )
export class EditComponent implements OnInit {
    productScreenDetail: ProducScreenDtail = new ProducScreenDtail();
    product: Product = new Product();
    thuoctinh: Thuoctinh = new Thuoctinh();
    sizes: Array<Size> = new Array();
    showInsertRowSize: number = 0;
    fileToUpload: FileList = null;
    isExistProductName: boolean = false;
    isExistSizeCode: boolean = false;
    description: string = '';
    name: string = '';
    menhcheckall: boolean = false;
    maucheckall: boolean = false;
    tuoicheckall: boolean = false;
    fullMenh: string = 'Kim;Mộc;Thủy;Hỏa;Thổ;';
    fullTuoi: string = 'Tý;Sửu;Dần;Mẹo;Thìn;Tỵ;Ngọ;Mùi;Thân;Dậu;Tuất;Hợi;';
    fullMau: string = 'Đỏ;Tím;Hồng;Vàng;Nâu;Cam;Xám;Ánh Vàng;Ánh Bạc;Xanh Biển;Đen;Xanh Lá;Xanh Ngọc;Trong Suốt;Trắng;';
    isDataAvailable: boolean = false;
    constructor( private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService, private dynamicScriptLoader: DynamicScriptLoaderService, private cookieService: CookieService  ) { }

    ngOnInit() {

        this.product.cat_id = 1;
        this.product.description = 'ABC';
        this.loadScripts();

        this.name = this.activatedRoute.snapshot.paramMap.get( 'name' );
        this.productService.getProduct( this.name ).subscribe( res => {
            this.productScreenDetail = <ProducScreenDtail>res;
            this.product = this.productScreenDetail.product;
            this.sizes = this.productScreenDetail.sizes;
            this.thuoctinh = this.productScreenDetail.thuoctinh;
            if ( this.thuoctinh.menh == this.fullMenh ) {
                this.menhcheckall = true;
            }
            if ( this.thuoctinh.tuoi == this.fullTuoi ) {
                this.tuoicheckall = true;
            }
            if ( this.thuoctinh.mau == this.fullMau ) {
                this.maucheckall = true;
            }
            this.description = this.productScreenDetail.description;
            this.isDataAvailable = true;
        } );

    }
    private loadScripts() {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader.load( 'ckeditor-js', 'angular' ).then( data => {
            // Script Loaded Successfully
        } ).catch( error => console.log( error ) );
    }
    menhChange( value ) {
        if ( value.checked ) {
            if ( value.value == 'All' ) {
                this.menhcheckall = true;
                this.thuoctinh.menh = this.fullMenh;
            } else {
                this.thuoctinh.menh = this.thuoctinh.menh + value.value + ';';
            }

        } else {
            if ( value.value == 'All' ) {
                this.menhcheckall = false;
                this.thuoctinh.menh = '';
            } else {
                this.thuoctinh.menh = this.thuoctinh.menh.replace( value.value + ';', '' );
            }

        }
    }

    tuoiChange( value ) {
        if ( value.checked ) {
            if ( value.value == 'All' ) {
                this.tuoicheckall = true;
                this.thuoctinh.tuoi = this.fullTuoi;
            } else {
                this.thuoctinh.tuoi = this.thuoctinh.tuoi + value.value + ';';
            }

        } else {
            if ( value.value == 'All' ) {
                this.tuoicheckall = false;
                this.thuoctinh.tuoi = '';
            } else {
                this.thuoctinh.tuoi = this.thuoctinh.tuoi.replace( value.value + ';', '' );
            }
        }
    }

    mauChange( value ) {
        if ( value.checked ) {
            if ( value.value == 'All' ) {
                this.maucheckall = true;
                this.thuoctinh.mau = this.fullMau;
            } else {
                this.thuoctinh.mau = this.thuoctinh.mau + value.value + ';';
            }

        } else {
            if ( value.value == 'All' ) {
                this.maucheckall = false;
                this.thuoctinh.mau = '';
            } else {
                this.thuoctinh.mau = this.thuoctinh.mau.replace( value.value + ';', '' );
            }
        }

    }

    checkProductName() {
        this.productService.checkProductName( this.product.name ).subscribe( res => {
            if ( res == true ) {
                this.isExistProductName = true;
            } else {
                this.isExistProductName = false;
            }

        } );
    }
    checkCodeOfSize( sizeCode: string ) {
        this.productService.checkCodeOfSize( sizeCode ).subscribe( res => {
            if ( res == true ) {
                this.isExistSizeCode = true;
            } else {
                this.isExistSizeCode = false;
            }

        } );
    }

    showInsertRowSizeAdd() {
        this.sizes.push(new Size());
    }

    handleFileInput( files: FileList ) {
        /*  this.fileToUpload = files;
         this.fileSaver.saveAs(files[0]); */
    }

    updateProduct() {

    }

    testDesc( value ) {
        this.description = value.value;
    }
    editProduct() {
        this.product.description = this.description;
        this.productService.editProduct( this.product, this.sizes, this.thuoctinh, this.fileToUpload, this.name,this.cookieService.get('token') ).subscribe( res => {
            if ( res == 200 ) {
                alert('Edit thành công.')
            }

        });
    }
    /* uploadFileToActivity() {
      this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
        // do something, if upload success
      }, error => {
        console.log(error);
      });
    }
    postFile(fileToUpload: File): Observable<boolean> {
      const endpoint = 'your-destination-url';
      const formData: FormData = new FormData();
      formData.append('fileKey', fileToUpload, fileToUpload.name);
      return this.httpClient
        .post(endpoint, formData, { headers: yourHeadersConfig })
        .map(() => { return true; })
        .catch((e) => this.handleError(e));
    } */
}
