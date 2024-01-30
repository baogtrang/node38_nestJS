import { Module } from "@nestjs/common";
import { CloudinaryProvider } from "./cloudinary.provider";
import { CloudinaryService } from "./cloudinary.service";

@Module({
    providers: [CloudinaryProvider, CloudinaryService],
    exports: [CloudinaryService] // export các function trong service để các resouce khác dùng
})
export class CloudinaryModule{}