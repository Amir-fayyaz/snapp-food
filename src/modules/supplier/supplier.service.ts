import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { CategoryAppService } from '../category/client/category.client.service';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly Supplier_Repository: Repository<SupplierEntity>,
    private readonly categoryService: CategoryAppService,
  ) {}

  //public methods
  public async createSupplier(data: CreateSupplierDto) {
    //Check is unique phone-number or not
    const supplier = await this.Supplier_Repository.findOne({
      where: { manager_mobile: data.manager_mobile },
    });

    if (supplier)
      throw new ConflictException(
        'already There is supplier with this phone-number ',
      );

    const category = await this.categoryService.getCategoryById(
      data.category_id,
    );

    if (data.invite_code) {
      const agent = await this.Supplier_Repository.findOne({
        where: { invite_code: data.invite_code },
      });

      if (!agent) throw new NotFoundException('Invalid invite-code');

      const newSupplier = this.Supplier_Repository.create({
        manager_firstname: data.manager_firstname,
        manager_lastname: data.manager_lastname,
        manager_mobile: data.manager_mobile,
        category,
        agent,
      });

      return await this.Supplier_Repository.save(newSupplier);
    } else {
      const newSupplier = this.Supplier_Repository.create({
        manager_firstname: data.manager_firstname,
        manager_lastname: data.manager_lastname,
        manager_mobile: data.manager_mobile,
        category,
        store_name: data.store_name,
        city: data.city,
        invite_code: data.invite_code || '',
      });

      return await this.Supplier_Repository.save(newSupplier);
    }
  }

  public async findSupplierByMobile(mobile: string) {
    return await this.Supplier_Repository.findOne({
      where: { manager_mobile: mobile },
    });
  }

  public async findSupplierById(id: number) {
    const supplier = await this.Supplier_Repository.findOne({ where: { id } });

    if (!supplier)
      throw new NotFoundException('There is no supplier with this id');

    return supplier;
  }
}
