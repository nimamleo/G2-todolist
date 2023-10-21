import { NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) {}

    async findOne(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>,
    ): Promise<T | null> {
        await this.checkIsExist(entityFilterQuery);
        return this.entityModel
            .findOne(entityFilterQuery, {
                _id: 0,
                __v: 0,
                ...projection,
            })
            .exec();
    }

    async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
        return this.entityModel.find(entityFilterQuery);
    }

    async create(createEntityData: unknown): Promise<T | any> {
        await this.checkIsExist(createEntityData)
        const entity = new this.entityModel(createEntityData);
        return entity.save();
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>,
    ): Promise<T | null> {
        await this.checkIsExist(entityFilterQuery)
        return this.entityModel.findOneAndUpdate(
            entityFilterQuery,
            updateEntityData,
            {
                new: true,
            },
        );
    }

    async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        await this.checkIsExist(entityFilterQuery)
        const deleteResult =
            await this.entityModel.deleteOne(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }

    async checkIsExist(query: FilterQuery<unknown>) {
        const res = await this.entityModel.findOne(query);
        if (!res) throw new NotFoundException('data not found');
        return !!res;
    }
}
