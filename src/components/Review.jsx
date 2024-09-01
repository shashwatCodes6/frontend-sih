import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../components/ui/carousel";
  import { Card, CardContent } from "../components/ui/card";
  
  const reviews = [
    {
      name: "Ravi Kumar",
      review: "This app has been a lifesaver! Scheduling appointments and accessing my medical records has never been easier. Highly recommend it to everyone.",
    },
    {
      name: "Priya Sharma",
      review: "The user interface is very intuitive and easy to navigate. I love how I can consult with doctors online without having to leave my home.",
    },
    {
      name: "Amit Patel",
      review: "Excellent app! It provides timely reminders for my medications and upcoming appointments. The customer support is also very responsive.",
    },
    {
      name: "Sneha Reddy",
      review: "I appreciate the detailed health tips and articles available on the app. It has helped me make better lifestyle choices.",
    },
    {
      name: "Vikram Singh",
      review: "The app's telemedicine feature is fantastic. I was able to get a consultation with a specialist within minutes. Very convenient and efficient.",
    },
  ];
  
  export function Reviews() {
    return (
      <div className="m-5 pb-20 pt-10">
        <div className="text-4xl flex justify-center m-8 font-semibold">
          Reviews
        </div>
      <div className="flex justify-center m-2">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-5xl"
        >
          <CarouselContent>
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 h-64">
              <div className="p-1 h-full">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                    <span className="text-xl md:text-3xl font-semibold">{review.name}</span>
                    <p className="mt-2 text-center">{review.review}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
      </div>
      </div>
    );
  }