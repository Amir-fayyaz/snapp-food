import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MenuEntity } from '../../entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuTypeSupplierService } from './menu-type.supplier.service';
import { SupplierService } from 'src/modules/supplier/supplier.service';
import { CreateMenuDto } from '../dto/menu/create-menu.dto';
import { S3Service } from 'src/modules/s3/s3.service';
import { StorageFolderName } from 'src/common/enums/storage-folderNames.enum';
import { UpdateMenuDto } from '../dto/menu/update-menu.dto';

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

  public async updateFood(
    data: UpdateMenuDto,
    id: number,
    supplier_id: number,
  ) {
    const { description, discount, image, name, price, score, type_id } = data;

    const Food = await this.Menu_Repository.findOne({
      where: { id, supplier: { id: supplier_id } },
    });

    if (!Food) throw new NotFoundException('Not found menu with this id');

    //change of image
    if (image) {
      await this.S3Service.deleteFile(Food.image);
      const { key } = await this.S3Service.uploadFile(
        image,
        StorageFolderName.Image,
      );

      if (type_id) {
        const type = await this.MenuTypeService.getMenuTypeById(type_id);

        await this.Menu_Repository.update(
          { id },
          {
            description,
            discount,
            image: key,
            name,
            price,
            score: score || 0,
            type,
          },
        );

        return { success: true };
      } else {
        await this.Menu_Repository.update(
          { id },
          { description, discount, image: key, name, price, score: score || 0 },
        );

        return { success: true };
      }
    } else {
      if (type_id) {
        const type = await this.MenuTypeService.getMenuTypeById(type_id);

        await this.Menu_Repository.update(
          { id },
          { description, discount, name, price, score: score || 0, type },
        );

        return { success: true };
      } else {
        await this.Menu_Repository.update(
          { id },
          { description, discount, name, price, score: score || 0 },
        );

        return { success: true };
      }
    }
  }
}
