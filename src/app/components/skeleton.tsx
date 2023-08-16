import React from 'react'
import Style from './styles/skeleton.module.css'

export default function Skeleton() {
  return (
    <article className={Style.article}>
            <section className={`${Style.section}`}>
                <div className={`${Style.p} ${Style.skeleton}`}></div>
                <div className={Style.tipos}>
                    <span className={`${Style.span} ${Style.skeleton}`}></span>
                    <span className={`${Style.span} ${Style.skeleton}`}></span>
                </div>
            </section>
            <span className={`${Style.figure} ${Style.skeleton}`}></span>
        </article>
  )
}
