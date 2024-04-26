import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { BROWSER_STORAGE } from '../storage';
import { AuthResponse } from '../models/authresponse';
import { Trip } from '../models/trip';
import { User } from '../models/user';

@Injectable()
export class TripDataService {
  constructor(
    private httpClient: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = 'http://localhost:3000/api';

  public async getTrips(): Promise<Trip[]> {
    return await lastValueFrom(
      this.httpClient.get<Trip[]>(`${this.apiBaseUrl}/trips`)
    ).catch(this.handleError);
  }

  public async getTrip(tripCode: string): Promise<Trip[]> {
    return await lastValueFrom(
      this.httpClient.get<Trip[]>(`${this.apiBaseUrl}/trips/${tripCode}`)
    ).catch(this.handleError);
  }

  public async addTrip(formData: Trip): Promise<Trip> {
    return await lastValueFrom(
      this.httpClient.post<Trip[]>(`${this.apiBaseUrl}/trips`, formData)
    ).catch(this.handleError);
  }

  public async updateTrip(formData: Trip): Promise<Trip[]> {
    return await lastValueFrom(
      this.httpClient.put<Trip[]>(
        `${this.apiBaseUrl}/trips/${formData.code}`,
        formData
      )
    ).catch(this.handleError);
  }

  public async deleteTrip(tripCode: string): Promise<any> {
    return await lastValueFrom(
      this.httpClient.delete(`${this.apiBaseUrl}/trips/${tripCode}`)
    ).catch(this.handleError);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private async makeAuthApiCall(
    urlPath: string,
    user: User
  ): Promise<AuthResponse> {
    return await lastValueFrom(
      this.httpClient.post<AuthResponse>(`${this.apiBaseUrl}/${urlPath}`, user)
    ).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

// import { Injectable, Inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// import { lastValueFrom } from 'rxjs';
// import { Trip } from '../models/trip';
// import { User } from '../models/user';
// import { AuthResponse } from '../models/authresponse';
// import { BROWSER_STORAGE } from '../storage';

// @Injectable({
//   providedIn: 'root',
// })
// export class TripDataService {
//   constructor(
//     private http: HttpClient,
//     @Inject(BROWSER_STORAGE) private storage: Storage
//   ) {}

//   private apiBaseUrl = 'http://localhost:3000/api';
//   private tripUrl = `${this.apiBaseUrl}trips/`;

//   getTrips(): Observable<Trip[]> {
//     return this.http.get<Trip[]>(this.tripUrl);
//   }

//   addTrip(formData: Trip): Observable<Trip> {
//     return this.http.post<Trip>(this.tripUrl, formData);
//   }

//   getTrip(tripCode: string): Observable<Trip[]> {
//     return this.http.get<Trip[]>(this.tripUrl + '/' + tripCode);
//   }

//   updateTrip(formData: Trip): Observable<Trip> {
//     return this.http.put<Trip>(this.tripUrl + '/' + formData.code, formData);
//   }

//   private handleError(error: any): Promise<any> {
//     console.error('Something has gone wrong', error);
//     return Promise.reject(error.message || error);
//   }

//   public login(user: User): Promise<AuthResponse> {
//     return this.makeAuthApiCall('login', user);
//   }
//   public register(user: User): Promise<AuthResponse> {
//     return this.makeAuthApiCall('register', user);
//   }
//   // private async makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
//   //   const url: string = `${this.apiBaseUrl}/${urlPath}`;
//   //   try {
//   //     const response = await this.http
//   //       .post(url, user)
//   //       .toPromise();
//   //     return response as AuthResponse;
//   //   } catch (error) {
//   //     return this.handleError(error);
//   //   }
//   // }

//   private async makeAuthApiCall(
//     urlPath: string,
//     user: User
//   ): Promise<AuthResponse> {
//     const url: string = `${this.apiBaseUrl}/${urlPath}`;
//     try {
//       const response = await firstValueFrom(
//         this.http.post<AuthResponse>(url, user)
//       );
//       return response;
//     } catch (error) {
//       return this.handleError(error);
//     }
//   }
// }
