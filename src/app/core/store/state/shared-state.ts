import { CustomError } from '../../models/error';

export interface SharedState {
  error: CustomError;
  loading: boolean;
}
