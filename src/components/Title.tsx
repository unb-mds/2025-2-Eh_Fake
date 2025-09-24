import React from 'react';
import Container from '@/components/ui/container';

export default function Title() {
  return (
    <Container>
      <div className="space-y-10 pb-2">
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
          <div className="rounded-lg relative flex flex-col justify-center items-center text-center gap-y-8 bg-secondary/60 py-12">
            <div className="drop-shadow-xl font-bold text-5xl sm:text-7xl lg:text-8xl sm:max-w-2xl max-w-xs text-black p-6 rounded-lg">
              Eh Fake!
              <div className="mt-6 text-2xl font-normal text-black">
                Seu portal de notícias para você saber a verdade.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}