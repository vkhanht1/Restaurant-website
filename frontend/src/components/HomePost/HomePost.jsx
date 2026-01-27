import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const instagramPosts = [
    {
        id: 1,
        img: "https://i.pinimg.com/1200x/bf/42/fd/bf42fdb91ba1234ed7882ea91f1d31e2.jpg",
        link: "https://www.instagram.com/miskapho/"
    },
    {
        id: 2,
        img: "https://i.pinimg.com/1200x/50/cb/36/50cb36256c069b0fe75880ddfa54e233.jpg",
        link: "https://www.instagram.com/miskapho/"
    },
    {
        id: 3,
        img: "https://i.pinimg.com/1200x/a9/d6/91/a9d6919e3badc97b8fbead5b5c4fdcc8.jpg",
        link: "https://www.instagram.com/miskapho/"
    },
    {
        id: 4,
        img: "https://i.pinimg.com/1200x/3c/3a/43/3c3a435148a2de221d2ae951f2f9b5f5.jpg",
        link: "https://www.instagram.com/miskapho/"
    },
    {
        id: 5,
        img: "https://i.pinimg.com/1200x/d2/d1/4e/d2d14e50e3689977902eeee6e63cd719.jpg",
        link: "https://www.instagram.com/miskapho/"
    },
    {
        id: 6,
        img: "https://i.pinimg.com/1200x/5f/75/0b/5f750b4423a7b91b357af0a59a80ac97.jpg",
        link: "https://www.instagram.com/miskapho/"
    }
];

const InstaPost = () => {
    return (
        <section className="bg-[#1a120b] py-20 relative overflow-hidden">
            <div className="text-center mb-12">
                <p className="text-amber-500 font-cinzel text-xs uppercase tracking-[0.3em] mb-2">
                    Follow Our Journey
                </p>
                <a
                    href="https://www.instagram.com/miskapho/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-3xl md:text-5xl font-dancingscript
                    text-amber-100 hover:text-amber-500 transition-colors">
                    <FaInstagram /> @MiskaPho
                </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {instagramPosts.map((post, index) => (
                    <motion.a
                        key={post.id}
                        href={post.link}
                        target="_blank"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group relative h-64 md:h-80 overflow-hidden cursor-pointer">
                        <img
                            src={post.img}
                            alt="Instagram Post"
                            className="w-full h-full object-cover transition-transform duration-700 
                            group-hover:scale-110"/>

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                            <FaInstagram className="text-amber-500 text-3xl transform translate-y-4 
                            group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="text-amber-100 font-cinzel text-xs tracking-widest uppercase transform 
                            translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                View Post
                            </span>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
};

export default InstaPost;