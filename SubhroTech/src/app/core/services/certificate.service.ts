import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Observable, map } from 'rxjs';

export interface CertificateDetails {
  id: string;
  name: string;
  domain: string;
  startDate: string;
  endDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  verifyCertificate(id: string): Observable<CertificateDetails | null> {
    return this.http.get('/assets/certificates.xlsx', { responseType: 'arraybuffer' }).pipe(
      map(data => {
        // Read without cellDates to control formatting via dateNF
        const wb = XLSX.read(data, { type: 'array', cellDates: false });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];

        // raw: false gets the formatted string (what the user sees in Excel)
        // dateNF: forces a standard format if the cell is numeric but treated as date
        const jsonData: any[] = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          raw: false,
          dateNF: 'd mmm yyyy'
        });

        // Find row by ID (Index 0)
        // Adjust column indices if the user says column order changed. 
        // Assuming: ID, Name, Domain, StartDate, EndDate
        // Added trim() to ensure whitespace tolerance
        const studentRow = jsonData.find(row => row[0] && row[0].toString().trim().toUpperCase() === id.trim().toUpperCase());

        if (studentRow) {
          return {
            id: studentRow[0].toString(),
            name: studentRow[1],
            domain: studentRow[2],
            startDate: this.smartParse(studentRow[3]),
            endDate: this.smartParse(studentRow[4])
          };
        }
        return null;
      })
    );
  }

  private smartParse(val: any): string {
    if (!val) return '';

    let date: Date | null = null;
    const strVal = val.toString().trim();

    if (/^\d+(\.\d+)?$/.test(strVal)) {
      const serial = parseFloat(strVal);
      date = new Date(Math.round((serial - 25569) * 86400 * 1000) + 12 * 3600 * 1000);
    } else {
      date = new Date(strVal);
    }

    // 3. If valid date, STRICTLY format as "10 Jan 2024"
    if (date && !isNaN(date.getTime())) {
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    // 4. Fallback: return original string if parsing failed
    return strVal;
  }
}
