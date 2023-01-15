import { useEffect, useState } from "react";
import { db } from '../config/firebase'
import { getDocs, collection, where, query } from "firebase/firestore"

const useGetTimeline = (userId) => {
    const [timeline, setTimeline] = useState([]);
    const userRef = collection(db, "timeline-data");
    const getUserQuery = query(userRef, where('userId', '==', userId));

    const getTimelineData = async () => {
        const data = await getDocs(getUserQuery);
        setTimeline(data.docs.map((doc) => doc.data()))
    }

    useEffect(() => {
        getTimelineData()
    }, [])

    return { timeline }

}

export default useGetTimeline;