import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MenuEntity } from '../../entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuTypeSupplierService } from './menu-type.supplier.service';
import { SupplierService } from 'src/modules/supplier/supplier.service';
import { CreateMenuDto } from '../dto/menu/create-menu.dto';
import { S3Service } from 'src/modules/s3/s3.service';
import { StorageFolderName } from 'src/common/enums/storage-folderNames.enum';

@Injectable()
export class MenuSupplierService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly Menu_Repository: Repository<MenuEntity>,
    private readonly MenuTypeService: MenuTypeSupplierService,
    private readonly supplierService: SupplierService,
    private readonly S3Service: S3Service,
  ) {}

  public async createFood(
    data: CreateMenuDto,
    supplier_id: number,
    image: Express.Multer.File,
  ) {
    const supplier = await this.supplierService.findSupplierById(supplier_id);
    const menuType = await this.MenuTypeService.getMenuTypeById(data.type_id);

    const { description, discount, name, price, score } = data;

    const { key } = await this.S3Service.uploadFile(
      image,
      StorageFolderName.Image,
    );

    const newFood = this.Menu_Repository.create({
      name,
      price,
      score: score || 0,
      description,
      discount: discount || 0,
      image: key,
      supplier,
      type: menuType,
    });

    return await this.Menu_Repository.save(newFood);
  }
}
