export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

    interface ILogin {
        access_token: string
        user: {
            email: string
            phone: string
            fullName: string
            role: string
            avatar: string
            id: string
        }
    }

    interface IRegister {
        _id: string
        email: string
        fullName: string
    }
    interface IUpdate{
        data: any
    }
    interface IResponseBulk {
        countSuccess: number
        countError: number
        detail: any
    }

    interface IUser {
        email: string
        phone: string
        fullName: string
        role: string
        avatar: string
        _id?: string
        isActive?: boolean
        createdAt?: Date
    }

    interface IFetchAccount {
        user: IUser
    }

    interface IUserTable {
        email: string
        phone: string
        fullName: string
        role: string
        avatar: string
        _id: string
        isActive: boolean
        createdAt: Date
        updatedAt: Date
    }

    interface IBookTable {
        _id: string
        thumbnail: string
        slider: any
        mainText: string
        author: string
        price: number
        sold: number
        quantity: number
        category: string
        createdAt: Date
        updatedAt: Date
    }
}

