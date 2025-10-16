import React from 'react';
import Container from '@/components/ui/container';

export default function Title() {
  return (
    <Container>
      <div className="space-y-10 pb-2 -mt-14">
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
          <div className="rounded-lg relative flex flex-col justify-center items-center text-center gap-y-8 bg-light-secondary/60 dark:bg-dark-secondary/80 py-8">
            <div className="drop-shadow-xl font-bold text-5xl sm:text-7xl lg:text-8xl sm:max-w-2xl max-w-xs text-dark-primary dark:text-light-primary p-6 rounded-lg">
              Eh Fake!
              <div className="mt-6 text-2xl font-normal text-dark-primary dark:text-light-primary">
                Seu portal de notícias para você saber a verdade.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}