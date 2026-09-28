# Disney World Match

A quiz for Pixie Travel Co. clients. Guests answer 15 questions about their group, budget and style. The quiz then recommends three Walt Disney World resorts and a short list of restaurants, and gives the guest a summary to send to their advisor.

It is a plain website (HTML, CSS and JavaScript). There's no build step, server or database.

## Files

| File | What it is | How often you'll touch it |
| --- | --- | --- |
| `data.js` | Every resort and restaurant, with the traits the quiz matches on | Often: whenever Disney changes something |
| `app.js` | The questions and the scoring rules | Sometimes: to add a question or tune weights |
| `styles.css` | Colors, fonts and layout | Rarely |
| `index.html` | The page shell | Rarely |

## How the matching works

1. Each resort in `data.js` has traits: price tier, how many it sleeps, transportation, how easy each park is to reach (1 to 3), vibe, pool quality, and the groups it suits.
2. Each answer adds or subtracts points for resorts with matching traits. For example, "Monorail" adds 15 points to monorail resorts, and each park the guest picks adds up to 20 points for resorts close to it.
3. Rooms that can't fit the party are removed. Resorts above the guest's budget lose points but can still show up if everything else fits.
4. The top three resorts are shown with the reasons they matched.
5. Restaurants work the same way: character preference, meal style, dining plan, price, picky vs. adventurous eaters, favorite stories, celebrations, and whether it's at the top resort or in a favorite park.

All the weights live in `scoreResort` and `scoreRestaurant` in `app.js`.

## Common edits

**Add a restaurant:** copy an existing entry in the `restaurants` list in `data.js` and change the values. The field meanings are listed at the top of the file.

**Remove a restaurant that closed:** delete its entry.

**Change a character lineup or description:** edit `chars` or `note`.

**Try it locally:** open `index.html` in a browser.

## Putting it online

The simplest free option is GitHub Pages: in the repository's Settings, open Pages, choose "Deploy from a branch", and pick the branch and `/ (root)`. You'll get a link you can share with clients or put on your website.

## Ideas for next steps

- Send results straight to the advisor (for example with a form service such as Formspree, or a Google Form) instead of copy and paste.
- Add questions about accessibility, trip length, or Lightning Lane interest.
- Add resort photos and links to your booking page.
- Add Universal Orlando or Disneyland versions using the same structure.

Resort and dining details were current as of the first draft. Please review `data.js` before sharing with clients.
