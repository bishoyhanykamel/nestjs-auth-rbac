import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllReviews() {
    return this.reviewsService.getAllReviews();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getReviewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.getReviewById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteReviewById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.deleteReviewById(id);
  }
}
