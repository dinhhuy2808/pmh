import { Component, OnInit } from '@angular/core';
import { Size } from '../../shared/models/size'
import { Product } from '../../shared/models/product'
import { Thuoctinh } from '../../shared/models/thuoctinh'
import { ProductService } from '../../shared/services/product.service'
import { FileSaver } from 'file-saver';
import { DynamicScriptLoaderService } from '../../shared/services/DynamicScriptLoaderService.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component( {
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css'],
    providers: [ProductService,DynamicScriptLoaderService]
})
export class AddComponent implements OnInit {
    product: Product = new Product();
    thuoctinh: Thuoctinh = new Thuoctinh();
    size: Array<Size> = [new Size(), new Size(), new Size(), new Size(), new Size(), new Size(), new Size(), new Size(), new Size(), new Size()];
    showInsertRowSize: number = 0;
    fileToUpload: FileList = null;
    isExistProductName: boolean = false;
    isExistSizeCode: boolean = false;
    description: string = '';
   catName :string = '';
    menhcheckall: boolean = false;
maucheckall: boolean = false;
tuoicheckall: boolean = false;
    fullMenh: string = 'Kim;Mộc;Thủy;Hỏa;Thổ;';
    fullTuoi: string = 'Tý;Sửu;Dần;Mẹo;Thìn;Tỵ;Ngọ;Mùi;Thân;Dậu;Tuất;Hợi;';
fullMau: string = 'Đỏ;Tím;Hồng;Vàng;Nâu;Cam;Xám;Ánh Vàng;Ánh Bạc;Xanh Biển;Đen;Xanh Lá;Xanh Ngọc;Trong Suốt;Trắng;'
    constructor(  private activatedRoute: ActivatedRoute, private router: Router,private productService: ProductService ,private dynamicScriptLoader: DynamicScriptLoaderService) { }

    ngOnInit() {
        this.catName = this.activatedRoute.snapshot.paramMap.get( 'name' );

        this.product.cat_id = 1;
        this.product.description = 'ABC';
        this.loadScripts();

    }
    private loadScripts() {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader.load('ckeditor-js','angular').then(data => {
          // Script Loaded Successfully
        }).catch(error => console.log(error));
      }
    menhChange( value ) {
        if ( value.checked ) {
            if (value.value == 'All') {
                this.menhcheckall = true;
                this.thuoctinh.menh = this.fullMenh;
            } else {
                this.thuoctinh.menh = this.thuoctinh.menh + value.value + ';';
            }
            
        } else {
            if (value.value == 'All') {
                this.menhcheckall = false;
                this.thuoctinh.menh = '';
            } else {
                this.thuoctinh.menh = this.thuoctinh.menh.replace( value.value + ';', '' );
            }
            
        }
    }

    tuoiChange( value ) {
        if ( value.checked ) {
            if (value.value == 'All') {
                this.tuoicheckall = true;
                this.thuoctinh.tuoi = this.fullTuoi;
            } else {
                this.thuoctinh.tuoi = this.thuoctinh.tuoi + value.value + ';';
            }
           
        } else {
            if (value.value == 'All') {
                this.tuoicheckall = false;
                this.thuoctinh.tuoi = '';
            } else {
                this.thuoctinh.tuoi = this.thuoctinh.tuoi.replace( value.value + ';', '' );
            }
        }
    }

    mauChange( value ) {
        if ( value.checked ) {
            if (value.value == 'All') {
                this.maucheckall = true;
                this.thuoctinh.mau = this.fullMau;
            } else {
                this.thuoctinh.mau = this.thuoctinh.mau + value.value + ';';
            }
           
        } else {
            if (value.value == 'All') {
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

        });
    }
    checkCodeOfSize( sizeCode: string ) {
        this.productService.checkCodeOfSize( sizeCode ).subscribe( res => {
            if ( res == true ) {
                this.isExistSizeCode = true;
            } else {
                this.isExistSizeCode = false;
            }

        });
    }

    showInsertRowSizeAdd() {
        this.showInsertRowSize++;
    }

    handleFileInput( files: FileList ) {
        /*  this.fileToUpload = files;
         this.fileSaver.saveAs(files[0]); */
    }

    addProduct() {
        this.product.description = this.description;
        this.productService.addProduct( this.product, this.size, this.thuoctinh, this.fileToUpload, this.catName ).subscribe( res => {
            if ( res == true ) {
                this.isExistSizeCode = true;
            } else {
                this.isExistSizeCode = false;
            }

        });
    }

    testDesc(value){
        this.description = value.value;
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
