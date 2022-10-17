import Event from "../models/Event"

export const createEvent = async (req, res) => {
    try {
        const { name, userId, Date } = req.body;
        const event = await Event.findOne({ name })
        if (event)
            return res.status(400).json({ msg: "This Event already exists." })

        const newEvent = new Event({ name, userId, Date })

        await newEvent.save()
        return res.json(newEvent)

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(400).json({ msg: "Event does not exist." })

        return res.json(event)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const updateEvent = async (req, res) => {
    try {
        const { name, userId, Date } = req.body;

        const event = await Event.findOne({ _id: req.params.id })
        if (!event) res.status(error.status).send("Event does not exists")

        await Event.findOneAndUpdate({ _id: req.params.id }, { name, Date }, { new: true })

        const categories = await Event.find({userId:userId})
        return res.json(categories)

    } catch (error) {
        res.status(error.status).send(error.message)
    }
}

export const deleteEvent = async (req, res) => {
    try {

        const deletedEvent = await Event.findByIdAndDelete(req.params.id)

        if (!deletedEvent) return res.status(500).json({ msg: "Event does not exist" })
        const events = await Event.find({ userId: req.params.userId })
        res.json(events)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.params.userId })

        if (!events) return res.status(500).json({ msg: "No Events Found" })

        return res.json(events)

    } catch (error) {
        res.send(error.message)
    }
}