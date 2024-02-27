import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError} from 'rxjs';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userReg: any;
  getSelectedCountry(event: Event | undefined) {
    throw new Error('Method not implemented.');
  }
  countries: any;
  stateList: any;
  citiList: any;
  countryList: any;
  trailForm: any;
  city: any;
  filteredCities: any;
  state: any;

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this.httpClient.get<any>('https://retoolapi.dev/ah0eW7/empreg');
  }

  getDataDummy(): Observable<any> {
    return this.httpClient.get<any>('https://retoolapi.dev/IwOwmj/dummy');
  }

  getCountries(): Observable<any[]> {
    return this.httpClient.get<any[]>('https://retoolapi.dev/ah0eW7/empreg');
  }

  getStatesByCountry(countryId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`https://retoolapi.dev/ah0eW7/empreg/states?countryId=${countryId}`);
  }

  getCitiesByStateAndCountry(stateId: string, countryId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`https://retoolapi.dev/ah0eW7/empreg/cities?stateId=${stateId}&countryId=${countryId}`);
  }

  getCitiesByState(stateName: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`https://retoolapi.dev/ah0eW7/empreg/cities?state=${stateName}`);
  }

  trimValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && typeof control.value === 'string') {
        const trimmedValue = control.value.trim();
        // Update the form control value with the trimmed value
        control.setValue(trimmedValue, { emitEvent: false });
      }
      return null;
    };
  }

  // deleteUser(id:number):Observable<any>{  
  //   return this.httpClient.delete('https://retoolapi.dev/lcqe0N/empData/${id}');
  // }

  deleteUser(id: number): Observable<any> {  
    return this.httpClient.delete(`https://retoolapi.dev/lcqe0N/empData/${id}`)
      .pipe(
        catchError(error => {
          console.error('Delete request error:', error);
          return throwError(error);
        })
      );
  }

  filterStatesByCountry(countryData: { countryname: any; }) {
    const selectedCountry = countryData.countryname;
    console.log(selectedCountry)
    return this.stateList.filter((state: { countryname: any; }) => state.countryname === selectedCountry);
  }

  getEmployeeDetails():Observable<any>{
    return this.httpClient.get('https://retoolapi.dev/lcqe0N/empData');
  }

  getUpdateEmployee(id:number,data:any):Observable<any>{
    return this.httpClient.put(`https://retoolapi.dev/lcqe0N/empData/${id}`,data);

  }

  // getdata (data:any){
  //   return this.httpClient.get("https://retoolapi.dev/dpg3sO/countryList"+"?"+data);
  // }

  // async fetchCountryData(): Promise<any> {
  //   const data = await this.httpClient.get('https://retoolapi.dev/dpg3sO/countryList');
  //   return data;
  // }

  getCountryData():Observable<any>{
    return this.httpClient.get('http://localhost:3000/country');
  }
  getStateData():Observable<any>{
    return this.httpClient.get('http://localhost:3000/state');
  }
  getCityData():Observable<any>{
    return this.httpClient.get('http://localhost:3000/city');
  }


  fetchStateData() {
    this.httpClient.get('https://retoolapi.dev/qIlTnT/stateList').subscribe((data: any) => {
      const responseData = data[0];
      this.stateList = responseData.States;
    });
  }
  // fetchCityData() {
  //   this.httpClient.get('https://retoolapi.dev/lKoFF6/cityList').subscribe((data: any) => {
  //     const responseData = data[0];
  //     this.citiList = responseData.cities;

  //   })
  // }

  // fetchCityData() {
  //   this.httpClient.get('https://retoolapi.dev/lKoFF6/cityList').subscribe(data);
  //     const responseData = data[0];

  // }

  
  fetchCityData() {
    this.httpClient.get('https://retoolapi.dev/lKoFF6/cityList').subscribe(data => {
      const responseData = data;
      console.log(responseData);
      // Handle responseData as needed
    });
  }

  getCountryList(selectedCountry: any): any {
   this.httpClient.get('http://localhost:3000/country').subscribe((data:any)=>{
         this.countryList=data;
        // console.log(this.countryList)
      })
      const valueCountry = this.countryList.getSelectedCountry(event);
      console.log(valueCountry)
    return this.countryList.find((country: { countryname: any; }) => country.countryname === selectedCountry);
  }
  
  getFilteredStates(selectedCountry: any): any[] {
    return this.stateList.filter((state: { countryname: any; }) => state.countryname === selectedCountry);
  }
  
  getCountryValue(event: any): string {
    return event.value;
  }
  
 
  
}
