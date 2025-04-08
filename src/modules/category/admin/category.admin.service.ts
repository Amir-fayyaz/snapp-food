import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import slugify from 'slugify';
import { S3Service } from 'src/modules/s3/s3.service';
import { StorageFolderName } from 'src/common/enums/storage-folderNames.enum';

@Injectable()
export class CategoryAdminService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly Category_Repository: Repository<CategoryEntity>,
    private readonly S3Service: S3Service,
  ) {}

  //private methods

  private async findCategoryBySlug(slug: string) {
    return await this.Category_Repository.findOne({ where: { slug } });
  }

  private async findCategoryById(id: number) {
    const category = await this.Category_Repository.findOne({ where: { id } });

    if (!category)
      throw new NotFoundException('There is no category with this id');

    return category;
  }

  private createSlug(title: string): string {
    return slugify(title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }

  //public methods
  public async createCategory(
    data: CreateCategoryDto,
    image: Express.Multer.File,
  ) {
    const category = await this.Category_Repository.findOne({
      where: { slug: data.slug },
    });
    if (category) throw new ConflictException('Category already exist');

    if (data.parent_id) {
      const ParentCategory = await this.Category_Repository.findOne({
        where: { id: data.parent_id },
      });

      if (!ParentCategory)
        throw new NotFoundException('There is no category with this id');

      const { url } = await this.S3Service.uploadFile(
        image,
        StorageFolderName.Image,
      );

      const newCategory = this.Category_Repository.create({
        title: data.title,
        slug: data.slug,
        show: Boolean(data.show),
        parent: ParentCategory,
        image: url,
      });

      return await this.Category_Repository.save(newCategory);
    }

    const { url } = await this.S3Service.uploadFile(
      image,
      StorageFolderName.Image,
    );

    const newCategory = this.Category_Repository.create({
      title: data.title,
      slug: data.slug,
      show: Boolean(data.show),
      image: url,
    });

    return await this.Category_Repository.save(newCategory);
  }
}
