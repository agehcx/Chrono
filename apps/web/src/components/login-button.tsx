"use client";

import {IDKitWidget, type ISuccessResult, type VerificationLevel} from '@worldcoin/idkit';
import {Button} from '@code-arena/ui';
import {useAuth} from '../hooks/use-auth';
import {useMockAuth} from '../hooks/use-mock-auth';

const WORLD_ID_APP_ID = process.env.NEXT_PUBLIC_WORLD_ID_APP_ID ?? '';
const VERIFICATION_LEVEL = (process.env.NEXT_PUBLIC_WORLD_ID_LEVEL ?? 'orb') as VerificationLevel;
const ENABLE_MOCK_AUTH = process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === 'true';

export const LoginButton = () => {
  const {token, verifyWorldId} = useAuth();
  const {login: mockLogin} = useMockAuth();

  return (
    <IDKitWidget
      app_id={WORLD_ID_APP_ID}
  action="chrono-mvp"
      verification_level={VERIFICATION_LEVEL}
      onSuccess={(result: ISuccessResult) => verifyWorldId.mutate(result)}
    >
      {({open}: {open: () => void}) => (
        <div className="flex flex-col items-stretch gap-2">
          <Button onClick={open} variant={token ? 'secondary' : 'primary'} size="lg">
            {token ? 'Go to Dashboard' : 'Verify with World ID'}
          </Button>
          {ENABLE_MOCK_AUTH && !token && (
            <Button type="button" variant="secondary" size="lg" onClick={mockLogin}>
              Use mock developer login
            </Button>
          )}
        </div>
      )}
    </IDKitWidget>
  );
};
