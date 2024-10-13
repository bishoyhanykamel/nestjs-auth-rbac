import { Injectable } from '@nestjs/common';
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
    const reviews = await this.reviewsRepo.find();
    return reviews;
  }

  async getReviewById(id: number) {
    const review = await this.reviewsRepo.find({
      where: {
        id
      }
    });
    return review;
  }

  async createReview(createReviewDto: CreateReviewDto) {
    const createdReview = this.reviewsRepo.create(createReviewDto);
    return await this.reviewsRepo.save(createdReview);
  }

  async deleteReviewById(id: number) {
    return await this.reviewsRepo.delete(id);
  }
}
