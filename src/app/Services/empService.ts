import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    countries: any;


    constructor(private httpClient: HttpClient,) { }

    getCountryData() {
        return this.httpClient.get('http://localhost:3000/country');

    }

    // onPostData(data:any){
    //     return this.httpClient.post('https://retoolapi.dev/lcqe0N/empData',data);
    // }

    // postApiData(url: string, requestbody : any){
    //     return this.httpClient.post(url, requestbody);
    //   }

    getStateData() {
        return this.httpClient.get('http://localhost:3000/States');
    }

    getCityData() {
        return this.httpClient.get('http://localhost:3000/cities');
    }

    getCountryValue(event: any): string {
        return event.value;
    }

    getUpdateEmployee(id: number, data: any): Observable<any> {
        return this.httpClient.put(`https://retoolapi.dev/lcqe0N/empData/${id}`, data);

    }

    getEmployeeDetails():Observable<any>{
        return this.httpClient.get('https://retoolapi.dev/lcqe0N/empData');
      }

    // getCountryArr(selectedCountry: string): Observable<any> {
    //     return this.countries.find((country: { countryname: any; }) => country.countryname === selectedCountry);
    //   }
}