import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  users:Map<string,Array<string>> = new Map([["Default",["password","TCS_Portfolio","TCS"]]]);
  contacts:Map<string,Array<string>> = new Map([["Default",[]]]);
  msg:string="";
  loginPage:boolean = true;
  signupPage:boolean = false;
  contactDetailsPage:boolean = false;
  existing_user:string = "";
  table_content:string = "<table><tr><th>Contact Details</th></tr><tr><th>Name</th><th>Phone Number</th></tr></table>";

  constructor() { }

  ngOnInit(): void {
  }
  //new user
  newRegUser(regsitrationDetails:NgForm){
    let regis = regsitrationDetails.value;
    if(this.users.has(regis.user)){
      this.msg = "Username is taken Please sign up with a different username!"
    }
    else{
      this.users.set(regis.user,[regis.pass,regis.first,regis.last]);
      this.contacts.set(regis.user,[]);
      this.msg = "New User Added"
    }
    regsitrationDetails.reset();
  }

  //login existing user
  checkUser(loginRef:NgForm){
    let login = loginRef.value;

    if(this.users.has(login.user)){
      let password:Array<string> = this.users.get(login.user) || [""];
      if (login.pass == password[0]){
        this.switchPage(2);
        this.existing_user = login.user;
      }
      else{
        this.msg = "Incorrect Password!"
      }
    }else {
        this.msg = "Login Failed. Please check your credentials or Register for a new account.";
    }
    loginRef.reset();
  }
    //get contact details
    newContact(contactDet:NgForm){
    let contact = contactDet.value;
    let arr = this.contacts.get(this.existing_user) || [];
    arr.push(contact.name);
    arr.push(contact.number);
    this.contacts.set(this.existing_user,arr);
    this.updateContacts();
    this.msg = "New contact added!"
  }

    //Displays the contact details in a table format.
  updateContacts(){
    this.table_content = "<table><tr><th>Contact Details</th></tr><tr><th>Name</th><th>Phone Number</th></tr>";
    let arr = this.contacts.get(this.existing_user) || [];
    for(let i = 0; i < arr.length; i += 2){
      this.table_content += "<tr><td>"+arr[i]+"</td>";
      this.table_content += "<td>"+arr[i+1]+"</td></tr>";
    }
    this.table_content += "</table>";
  }
  
  //change page 
  switchPage(page:number){
    console.log("change"+page);
    if (page == 0){
      this.loginPage = true;
      this.signupPage = false;
      this.contactDetailsPage = false;
    }
    else if (page == 1){
      this.loginPage = false;
      this.signupPage = true;
      this.contactDetailsPage = false;
    }
    else{
      this.loginPage = false;
      this.signupPage = false;
      this.contactDetailsPage = true;
    }
    this.msg = "";
  }

}
