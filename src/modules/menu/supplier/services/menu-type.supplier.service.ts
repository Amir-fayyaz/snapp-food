import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeEntity } from '../../entities/type.entity';
import { Repository } from 'typeorm';
import { CreateMenuTypeDto } from '../dto/menu-type/create-menuType.dto';
import { SupplierService } from 'src/modules/supplier/supplier.service';
import { UpdateMenuTypeDto } from '../dto/menu-type/update-menuType.dto';

@Injectable()
export class MenuTypeSupplierService {
  constructor(
    @InjectRepository(TypeEntity)
    private readonly Type_Repository: Repository<TypeEntity>,
    private readonly SupplierService: SupplierService,
  ) {}

  //public methods
  public async createMenuType(data: CreateMenuTypeDto, supplier_id: number) {
    const supplier = await this.SupplierService.findSupplierById(supplier_id);

    const newMenuType = this.Type_Repository.create({
      title: data.title,
      supplier,
    });

    return await this.Type_Repository.save(newMenuType);
  }

  public async updateMenuType(
    data: UpdateMenuTypeDto,
    id: number,
    supplier_id: number,
  ) {
    const menuType = await this.Type_Repository.findOne({
      where: { id, supplier: { id: supplier_id } },
      relations: { supplier: true },
    });

    if (!menuType) throw new NotFoundException();

    menuType.title = data.title;

    await this.Type_Repository.save(menuType);

    return { success: true };
  }
}
