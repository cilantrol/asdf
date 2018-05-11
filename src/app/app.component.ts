import { Subscription } from 'rxjs/Subscription';
import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  courses$: Observable<any>;
  course$;
  coursesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list('/courses').snapshotChanges();
    //  db.list('/courses').snapshotChanges().subscribe(c => {
    //   var temp = c.map(course => {
    //     var value = course.payload.val();
    //     return {
    //       key: course.payload.key,
    //       value: {
    //         name: value.name,
    //         price: value.price,
    //         isLive: value.isLive,
    //         sections: value.sections
    //       }
    //     }
    //   });
    //   this.courses$ = Observable.of(temp);
    // });


    console.log(this.courses$);
    this.course$ = db.object('/courses/1').valueChanges();
    this.coursesRef = db.list('/courses/');

  }

  add(course: HTMLInputElement) {
    this.coursesRef.push( course.value);
    //   name: course.value,
    //   price: 150,
    //   isLive: true,
    //   sections: [
    //     {title: 'components1'},
    //     {title: 'components2'},
    //     {title: 'components3'}
    //   ]
    // });

    course.value = '';
  }

  update(course) {
    // console.log(course);
    // console.log(course.key);
    console.log(course.payload.val());
    // console.log(course.payload.node_.value_);

    this.db.object('/courses/'+ course.key)
     .set({
       title: course.payload.val() + ' updated',
       price: 150
     });
  }

  delete(course) {
    this.db.object('/courses/'+course.key)
      .remove()
      .then(x => console.log('deleted'));
      // .catch(err =>)
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
