import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dtos/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepo: Repository<Review>
  ) { }

  async getAllReviews() {
    let reviews = undefined;
    try {
      reviews = await this.reviewsRepo.find();
    } catch (err) {
      throw new InternalServerErrorException('Could not connect to database.');
    }
    if (reviews == undefined)
      throw new InternalServerErrorException('Could not load reviews');
    return reviews;
  }

  async getReviewById(id: number) {
    let review = undefined;
    try {
      review = await this.reviewsRepo.find({
        where: {
          id
        }
      });
    } catch (err) {
      throw new InternalServerErrorException('Could not connect to database.');
    }
    if (review == undefined)
      throw new InternalServerErrorException('Could not load review.');

    if (review.length <= 0)
      throw new NotFoundException('Review does not exist.');

    return review;
  }

  async createReview(createReviewDto: CreateReviewDto) {
    let createdReview = undefined;
    try {
      createdReview = this.reviewsRepo.create(createReviewDto);
    } catch (err) {
      throw new InternalServerErrorException('Could not connect to database.');
    }
    if (createdReview == undefined)
      throw new InternalServerErrorException('Could not load create review.');

    return await this.reviewsRepo.save(createdReview);
  }

  async deleteReviewById(id: number) {
    return await this.reviewsRepo.delete(id);
  }
}
