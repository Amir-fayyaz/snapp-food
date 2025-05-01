import { SetMetadata } from '@nestjs/common';

export const SKIP_KEY = 'SKIP_AUTH';

export const SkipAuth = () => SetMetadata(SKIP_KEY, true);
