import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CouponData {
  code: string;
  discountType: 'P' | 'F'; // Percentage or Flat
  discountValue: number;
  usageLimit: 'single' | 'multiple';
  status: string;
  clientName: string;
  totalUsed: number;
}

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  validateCoupon(code: string, originalPrice: number): Observable<{ success: boolean; discount_amount: number; final_price: number; coupon?: any; message?: string }> {
    // We use the same XLSX approach as CertificateService
    return this.http.get(`${environment.apiBaseUrl}/coupon_list.xlsx`, { responseType: 'arraybuffer' }).pipe(
      map(data => {
        const wb = XLSX.read(data, { type: 'array' });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });

        // Skip header row at index 0
        // Expected structure: ['Coupon Code', 'Discount Type', 'Value', 'Usage Type', 'Status', 'Client Name', 'Total Used']
        const couponRow = jsonData.find((row, index) => 
          index > 0 && row[0] && row[0].toString().trim().toUpperCase() === code.trim().toUpperCase()
        );

        if (!couponRow) {
          return { success: false, discount_amount: 0, final_price: originalPrice, message: 'Invalid coupon' };
        }

        // Status is at index 4
        if (couponRow[4].toString() !== '1') {
          return { success: false, discount_amount: 0, final_price: originalPrice, message: 'Coupon expired' };
        }

        let discountAmount = 0;
        // Discount Type at index 1, Value at index 2
        const discValue = parseFloat(couponRow[2]);
        if (couponRow[1] === 'P') {
          discountAmount = Math.round((originalPrice * discValue) / 100);
        } else {
          discountAmount = discValue;
        }

        const finalPrice = Math.max(0, originalPrice - discountAmount);

        return {
          success: true,
          discount_amount: discountAmount,
          final_price: finalPrice,
          coupon: {
            code: couponRow[0],
            discount_type: couponRow[1],
            discount_value: couponRow[2],
            client_name: couponRow[5]
          }
        };
      })
    );
  }
}
