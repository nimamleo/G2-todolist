import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) {}

    async findOne(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>,
    ): Promise<T | null> {
        return this.entityModel
            .findOne(entityFilterQuery, {
                _v: 0,
                _id: 0,
                ...projection,
            })
            .exec();
    }
    async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | []> {
        return this.entityModel.find(entityFilterQuery);
    }

    async create(createEntityData: unknown): Promise<T | any> {
        const entity = new this.entityModel(createEntityData);
        return entity.save();
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>,
    ): Promise<T | null> {
        return this.entityModel.findOneAndUpdate(
            entityFilterQuery,
            updateEntityData,
            { new: true },
        );
    }

    async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult =
            await this.entityModel.deleteOne(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }
}
