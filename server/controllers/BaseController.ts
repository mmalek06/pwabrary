import { Request, Response } from 'express';
import { ErrorCodes } from '../services/ErrorCodes';

import { ControllerErrorCodes } from './ControllerErrorCodes';

export default abstract class BaseController {
    constructor(protected _res: Response, protected _req: Request) {}

    protected _parameterEmpty(paramName: string) {
        this._res
            .status(400)
            .json({
                technicalError: ControllerErrorCodes.PARAMETER_EMPTY,
                parameter: paramName
            });
    }

    protected _objectNonExistent() {
        this._res
            .status(404)
            .json({
                technicalError: ControllerErrorCodes.OBJECT_NOT_EXISTING
            });
    }

    protected _serviceError(error: ErrorCodes) {
        this._res
            .status(400)
            .json({
                validationError: error
            });
    }
}
