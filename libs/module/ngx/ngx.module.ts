import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { PopoverModule } from "ngx-bootstrap/popover";
const ngxComponents = [
  CarouselModule.forRoot(),
  TooltipModule.forRoot(),
  ModalModule.forRoot(),
  PopoverModule.forRoot(),
  AccordionModule.forRoot(),
  PaginationModule.forRoot(),
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ngxComponents
  ],
  exports: [
    ngxComponents
  ]
})
export class NgxModule { }
