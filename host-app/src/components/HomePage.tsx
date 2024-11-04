import { useEffect, useState } from "react";
import heroPage from "../assets/hero-Page.png";
import logoHero from "../assets/hero-logo.png";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function HomePage() {
    const navigate = useNavigate()
    const [displayedText, setDisplayedText] = useState<any>();
    const fullText = "E mbark on Your Pokémon Journey!";
    const typingSpeed = 150; // Speed of typing (in ms)
    const pauseBeforeReset = 1500; // Pause before resetting the text (in ms)

    useEffect(() => {
        let index = 0;
        let typingInterval: any;

        const typeText = () => {
            if (index < fullText.length - 1) {
                if (index === 0) {
                    setDisplayedText(fullText[index])
                }
                else
                    setDisplayedText((prev: string) => prev + fullText[index]);
                index++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setDisplayedText(undefined); // Reset displayed text
                    index = 0; // Reset index for typing
                    typingInterval = setInterval(typeText, typingSpeed); // Restart typing
                }, pauseBeforeReset);
            }
        };

        typingInterval = setInterval(typeText, typingSpeed);
        return () => clearInterval(typingInterval); // Clean up interval on unmount
    }, [fullText]);

    return (
        !heroPage ? <LoadingPage/>: 
        <div className="relative flex justify-center  h-full w-full">
            <div className=" absolute inset-0 z-[-999] bg-black">
                <img className="object-cover h-full w-full" src={heroPage} alt="" />
            </div>
            <div className="relative max-w-[465px] h-[600px] flex flex-col justify-center items-center gap-8">
                <m.h1 className="text-white md:text-3xl font-extrabold text-center px-20 text-lg"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}>
                    {displayedText}

                </m.h1>
                <m.div className="text-white md:text-base mx-auto text-center px-5 text-sm"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}>
                    Capture, train, and battle with your favorite Pokémon. Explore the world, grow stronger, and organize your team to become the ultimate Trainer.
                    Gotta catch ‘em all!
                </m.div>
                <m.div className=" !sm:max-h-5 md:h-60" initial={{ height: "10vh", opacity: 0 }}
                    animate={{ height: "30%", opacity: 1 ,}}
                    transition={{ duration: 0.8, delay: 1.3 }}>
                    <img className="h-full object-cover relative z-20 cursor-pointer" src={logoHero} alt="" loading="lazy" onClick={() => navigate("/pokemons")} />
                </m.div>
            </div>
        </div>
    );
}

export default HomePage;
