import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import mongoose from 'mongoose';

const handleCastError = (error: mongoose.Error.CastError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources : TErrorSources = [
    {
        path: error?.path,
        message: error?.message
    }
  ]
    

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;
