import React, { useState, useEffect } from 'react'
import Badge from '../components/badge'
import axios from 'axios'
export const Badges = () => {
    const [badges, setBadges] = useState()
    useEffect(() => {
        const getBadges = async () => {
            setBadges(
                (
                    await axios.get(
                        process.env.REACT_APP_WALLETCONNECT_BACKEND_URL +
                            '/ipfs/getPins'
                    )
                ).data
            )
        }
        getBadges()
    }, [])
    return (
        badges && (
            <div className="bg-grey text-white max-w-xs h-72 rounded-2xl space-y-3">
                <div className="pb-11 pt-6">
                    <h2 className="text-2xl pl-4">Badges</h2>
                    <div className="flex flex-row flex-wrap justify-center">
                        {badges.map((badge) => {
                            let image =
                                'https://ipfs.io/ipfs/' +
                                badge.image.split('ipfs://')[1]
                            return (
                                <Badge
                                    text={badge.name}
                                    src={image}
                                ></Badge>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    )
}
