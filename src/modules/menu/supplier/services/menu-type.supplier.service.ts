import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeEntity } from '../../entities/type.entity';
import { Repository } from 'typeorm';
import { CreateMenuTypeDto } from '../dto/menu-type/create-menuType.dto';
import { SupplierService } from 'src/modules/supplier/supplier.service';

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
}
