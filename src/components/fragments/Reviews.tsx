import { ReviewsProps } from "@/types/types";
import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <section className="flex flex-col gap-4 px-5 md:px-10">
      {!!reviews?.length && (
        <>
          <h1 className="text-2xl font-semibold">Reviews</h1>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {reviews?.slice(0, 6).map((review) => (
              <li key={review?.id}>
                <Card
                  className="w-full h-full p-3 bg-transparent border shadow-sm border-primary"
                  radius="sm"
                >
                  <CardBody className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between gap-3">
                      <div className="flex flex-row gap-2">
                        {review?.author_details.avatar_path ? (
                          <Image
                            radius="full"
                            shadow="md"
                            alt={review?.author}
                            src={`https://image.tmdb.org/t/p/original/${review?.author_details.avatar_path}`}
                            className="object-cover w-12 h-12 md:w-16 md:h-16"
                          />
                        ) : (
                          <FaUserCircle
                            className="w-12 h-12 rounded-full bg-zinc-400 md:w-16 md:h-16"
                            fill="#242424"
                          />
                        )}
                        <div className="flex flex-row items-start justify-between md:pt-1">
                          <div className="flex flex-col">
                            <h1 className="text-sm font-semibold md:text-medium line-clamp-1">
                              {review?.author_details.name || review?.author}
                            </h1>
                            <p className="text-xs text-lavender-orchid">
                              @{review?.author_details.username}
                            </p>
                          </div>
                        </div>
                      </div>
                      <BiSolidQuoteAltLeft
                        className="scale-x-[-1] w-7 h-7 md:w-9 md:h-9"
                        fill="#611DBA"
                      />
                    </div>
                    <p className="text-xs line-clamp-6 md:text-sm text-white/40">
                      {review?.content}
                    </p>
                  </CardBody>
                </Card>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Reviews;
