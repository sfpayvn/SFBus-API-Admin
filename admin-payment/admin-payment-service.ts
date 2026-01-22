import { PaymentDocument } from '@/module/core/payment/schema/payment.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminPaymentDto, AdminRequestPaymentDto } from './dto/admin-payment.dto';
import { plainToInstance } from 'class-transformer';
import { AdminCreatePaymentDto } from './dto/admin-create-payment.dto';
import { AdminBookingService } from '../admin-booking/admin-booking-service';
import { BookingService } from '@/module/core/booking/booking-service';
import { AdminUpdateBookingDto } from '../admin-booking/dto/admin-update-booking.dto';
import { UpdateBookingDto } from '@/module/core/booking/dto/update-booking.dto';
import { PaymentService } from '@/module/core/payment/payment-service';

@Injectable()
export class AdminPaymentService {
  constructor(
    @InjectModel(PaymentDocument.name) private readonly paymentModel: Model<PaymentDocument>,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
  ) {}

  async findPaymentByBookingId(bookingId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminPaymentDto[]> {
    const conditions = {
      referrentId: bookingId,
      tenantId,
    };

    const paymentsModel = await this.paymentModel.find(conditions).lean().exec();

    return paymentsModel.map((payment) => plainToInstance(AdminPaymentDto, payment));
  }

  async findAllByBookingId(bookingId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminPaymentDto[]> {
    const conditions = {
      referrentId: bookingId,
      tenantId,
    };

    const paymentsModel = await this.paymentModel.find(conditions).lean().exec();

    return paymentsModel.map((payment) => plainToInstance(AdminPaymentDto, payment));
  }

  async processBookingPayment(
    requestPaymentDto: AdminRequestPaymentDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminPaymentDto[]> {
    return this.paymentService.processBookingPayment(requestPaymentDto, tenantId);
  }
}
