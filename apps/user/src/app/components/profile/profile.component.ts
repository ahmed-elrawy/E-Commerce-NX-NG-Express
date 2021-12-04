import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Profile } from '../../../../../../libs/models/profile';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  profile!: Profile
  modalRef!: BsModalRef
  formData: FormData = new FormData();
  public uploader: FileUploader = new FileUploader({});
  selectedFile? =  '';

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private route: ActivatedRoute
  ) {
    if (route.snapshot.data.profile) {
      this.profile = route.snapshot.data.profile;
      this.updateObject.firstname = this.profile.firstname;
      this.updateObject.lastname = this.profile.lastname;
      this.updateObject.age = this.profile.age;
      this.updateObject.email = this.profile.email;
      this.updateObject.gender = this.profile.gender;
      this.updateObject.phone = this.profile.phone;
      this.updateObject.country = this.profile.country;
      this.updateObject.city = this.profile.city;
      this.updateObject.address = this.profile.address;
    }
   }

   updateObject = {
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    age:'',
    phone: '',
    country: '',
    city: '',
    address: ''
  };

  openModal(templet: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templet)
  }

  updateProfile() {
    this.authService.updateProfile(this.updateObject)?.subscribe(result => {
      this.profile = result;
      this.authService.username = `${result.firstname} ${result.lastname}`
    })
  }
  hide(): void {
    this.modalRef.hide();
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedFile = file.name ;
      this.formData.set('image', file);
    }
  }

  ngOnInit(): void {
    console.log()
  }

  uploadingNewPicture() {
    this.authService.addProfileImage(this.formData)!
      .subscribe(res => {
        this.profile = res;
        this.formData.delete('image');
        this.selectedFile = '';
        alert('profile image uploaded successfully');
      })
  }

  changingExistPicture() {
    this.authService.changeProfileImage(this.formData)!
      .subscribe(res => {
        this.profile = res;
        this.formData.delete('image');
        this.selectedFile = '';
        alert('profile image changed successfully');
      });
  }

}
