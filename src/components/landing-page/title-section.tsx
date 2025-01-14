import React from 'react';
import { Cover } from '../ui/cover';

interface TitleSectionProps {
  title: string;
  subheading?: string;
  pill: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subheading,
  pill,
}) => {
  return (
    <React.Fragment>
      <section
        className="flex
        flex-col
        gap-4
        justify-center
        items-start
        md:items-center
      "
      >
        <article
          className="rounded-full
          p-[1px]
          text-sm
          bg-gradient-to-r
          
          from-brand/brand-primaryblue
          to-brand/brand-washedPurple
        "
        >
          <div
            className="rounded-full 
            px-3
            py-1
            bg-black"
          >
            {pill}
          </div>
        </article>
        {subheading ? (
          <>
            <h2
              className="text-left
              text-3xl
              sm:text-5xl
              sm:max-w-[750px]
              md:text-center
              font-semibold
            "
            >
              {title}
            </h2>
            <p
              className="dark:text-washed-purple/washed-purple-700 sm:max-w-[450px]
              md:text-center
            "
            >
              {subheading}
            </p>
          </>
        ) : (
          <h1
            className=" text-left 
            text-4xl
            sm:text-6xl
            sm:max-w-[850px]
            md:text-center
            font-semibold
          "
          >
           {title === 'Organize, Share, and Manage Your Links with Ease' ? (<div>Organize, Share, and Manage Your <Cover >Links</Cover>  with Ease</div>): (title)}
          </h1>
        )}
      </section>
    </React.Fragment>
  );
};

export default TitleSection;