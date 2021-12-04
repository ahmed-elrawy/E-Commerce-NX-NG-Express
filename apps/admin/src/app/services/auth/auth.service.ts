import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ErrorHandler } from "../../../../../../libs/error-handler";
import { Observable } from 'rxjs';

import { User } from "../../../../../../libs/models/user";
import { Profile } from '../../../../../../libs/models/profile';
import { Cart } from '../../../../../../libs/models/cart';
import { CartItem } from '../../../../../../libs/models//cart-item';
import { UserData } from '../../../../../../libs/models/user-data';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  _registerUrl = `http://localhost:3000/auth/register`;
  _loginUrl = `http://localhost:3000/auth/login`;
  _userUrl = `http://localhost:3000/auth/current-user`;
  _profileUrl = `http://localhost:3000/profile`;
  private _usersURL = `http://localhost:3000/auth/system-users`;
  private _userDataURL = `http://localhost:3000/auth/user-main-data`;
  private imageChangeUrl = `http://localhost:3000/profile/userprofile/changeprofileimage`;
  private newImageUrl = `http://localhost:3000/profile/userprofile/setprofileimage`;
  private contactUrl = `http://localhost:3000/contacts/new-mail`;

  public currntUser!: User ;
  public profile!: Profile ;
  public cart!: Cart ;
  public cartItem!: CartItem ;
  public username!: string ;

  private errorHandler: ErrorHandler = new ErrorHandler()

  register(data: User) : Observable<User >| undefined | null{
    try{
      return this.http.post<User>(this._registerUrl, data) //endpoint
    } catch(e: any){
    this.errorHandler.handleError(e)
    }
    return null
  }

  login(data: any) : Observable<any> | undefined | null{
    try{
        return this.http.post(this._loginUrl, data) //endpoint
    } catch(e: any){
      this.errorHandler.handleError(e)
    }
    return null
  }


  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  PUserData() {

    if(this.isLoggedIn()){
      this.prepareUserData()?.subscribe((userData)=> {
        this.profile= userData.profile;
        this.username = `${userData.profile.firstname} ${userData.profile.lastname}`;
        this.cartItem = userData.cartItem;
      });
      this.getCurrentUser()?.subscribe(resUser => {
        this.currntUser = resUser
      });
    }
  }
  prepareUserData(): Observable<UserData>| undefined | null{ 
    try {
      return this.http.get<UserData>(this._userDataURL)
    } catch (error: any ){
      this.errorHandler.handleError(error)
    }
    return null
  }

  getCurrentUser(){
    try {
      return this.http.get<any>(this._userUrl)
    } catch (e: any){
      this.errorHandler.handleError(e)
    }
    return null

  }

  getSystemUsers():Observable<User[]>|undefined | null{
    try {
      return this.http.get<User[]>(this._userUrl)
    } catch (e: any){
      this.errorHandler.handleError(e)
    }
    return null

  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean {
    return !!localStorage.getItem('token')  // !! means this will return boolean
  }

  getUserProfile(): Observable<any> |undefined | null{
    try {
      return this.http.get<any>(this._profileUrl)
    } catch (e: any){
      this.errorHandler.handleError(e)
    }
    return null

  }

  messageContact(messageForm:any):Observable<void> |undefined {
    try{
      return this.http.post<void>(this.contactUrl, messageForm)
    }catch(e:any){
      this.errorHandler.handleError(e)
    }
    return 

  }
 
  
  updateProfile(updateForm: any): Observable<Profile> |undefined  | null  {
    try {
      return this.http.put<Profile>(
        `${this._profileUrl}/userprofile/edit`,
        updateForm
      );
    } catch (error: any) {
      this.errorHandler.handleError(error);
    }
    return null
  }

  addProfileImage(imageForm: any): Observable<Profile> | undefined  {
    try {
      return this.http.post<Profile>(this.newImageUrl, imageForm);
    } catch (err:any) {
      this.errorHandler.handleError(err);
    }
    return
  }

  changeProfileImage(imageForm:any): Observable<Profile> | undefined {
    try {
      return this.http.patch<Profile>(this.imageChangeUrl, imageForm);
    } catch (err: any) {
      this.errorHandler.handleError(err);
    }
    return 
  }
}
