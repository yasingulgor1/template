import { NativeDateAdapter } from "@angular/material/core";
import { Injectable } from "@angular/core";

@Injectable()
export class AdvanceDateAdapter extends NativeDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }
}
