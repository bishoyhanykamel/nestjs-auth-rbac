import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService
  ) { }

  @Get()
  getAllReviews() {
    return this.reviewsService.getAllReviews();
  }

  @Get('/:id')
  getReviewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.getReviewById(id);
  }

  @Post()
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Delete('/:id')
  deleteReviewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.deleteReviewById(id);
  }
}
